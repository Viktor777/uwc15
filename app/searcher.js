'use strict';

var Input = require('./input');

module.exports = (function () {
    var START_LENGTH = 3,
        _isBusy = false;

    function Searcher(namespace) {
        this.namespace = namespace;
        this.container = document.getElementById(this.namespace + '-container');
        this.itemPrefix = this.namespace + '-container-item-';
        this.storage = [];
        this.time = {
            start: 0,
            end: 0
        };

        this.onLoad().addKeyListener();
    }

    Searcher.prototype.onLoad = function () {
        var i;

        if (this.container) {
            this.items = this.container.getElementsByTagName('*');

            for (i = this.items.length; i--;) {
                this.items[i].id = this.itemPrefix + i;
                this.storage[this.storage.length] = this.items[i].textContent;
            }
            this.binarySearch = new Worker('app/binary-search.js');
            this.value = '';

            this.addWorkerListener();
        }

        return this;
    };

    Searcher.prototype.isAllowed = function () {
        return !_isBusy && this.value.length >= START_LENGTH;
    };

    Searcher.prototype.addKeyListener = function () {
        document.addEventListener('keypress', this.onKey.bind(this));

        return this;
    };

    Searcher.prototype.onKey = function (event) {

        if (!_isBusy) {
            if (!this.input && this.value.length < START_LENGTH) {
                this.value += String.fromCharCode(event.keyCode || event.which);
            }

            if (this.isAllowed()) {
                this.show();
            }
        }

        return this;
    };

    Searcher.prototype.show = function () {

        if (!this.input) {
            this.input = new Input(this.namespace + '-input', this.onInput.bind(this));
        }
        this.input.show(this.value);

        this.search();

        return this;
    };

    Searcher.prototype.onInput = function (event) {
        this.value = event.target.value;

        this.search();

        return this;
    };

    Searcher.prototype.addWorkerListener = function () {
        this.binarySearch.addEventListener('message', this.onMessage.bind(this), false);

        return this;
    };

    Searcher.prototype.search = function () {

        if (this.isAllowed()) {
            this.time.start = performance.now();
            this.disable();
            this.binarySearch.postMessage({
                arr: this.storage,
                value: this.value
            });
        }

        return this;
    };

    Searcher.prototype.disable = function () {
        _isBusy = true;

        return this;
    };

    Searcher.prototype.enable = function () {
        _isBusy = false;

        return this;
    };

    Searcher.prototype.onMessage = function (event) {
        var i;

        this.time.end = performance.now();
        this.enable()
            .input.setTime(this.time.end - this.time.start).setCount(event.data.length);

        for (i = event.data.length; i--;) {
            document.getElementById(this.itemPrefix + event.data[i]).style.display = 'block';
        }

        return this;
    };

    return Searcher;
})();