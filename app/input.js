'use strict';

module.exports = (function () {

    function Input(namespace, callback) {
        this.namespace = namespace;
        this.callback = callback;
    }

    Input.prototype.insert = function (value) {
        this.container = document.createElement('div');
        this.container.id = this.namespace + '-result';
        this.container.classList.add('result');
        this.input = document.createElement('input');
        this.input.id = this.namespace + '-input';
        this.input.classList.add('input');
        this.input.autofocus = true;
        this.input.value = value;
        this.button = document.createElement('button');
        this.button.id = this.namespace + '-button';
        this.button.classList.add('button');
        this.button.innerHTML = 'Close';
        this.time = document.createElement('span');
        this.time.id = this.namespace + '-time';
        this.time.classList.add('time');
        this.count = document.createElement('span');
        this.count.id = this.namespace + '-count';
        this.count.classList.add('count');
        this.container.appendChild(this.input);
        this.container.appendChild(this.button);
        this.container.appendChild(this.count);
        this.container.appendChild(this.time);
        document.body.insertBefore(this.container, document.body.firstChild);

        this.addListeners();

        return this;
    };

    Input.prototype.show = function (value) {

        if (!this.input) {
            this.insert(value);
        } else {
            this.input.value = value;
            this.container.style.display = 'block';
            this.input.focus();
        }

        return this;
    };

    Input.prototype.hide = function () {
        this.container.style.display = 'none';

        return this;
    };

    Input.prototype.addListeners = function () {

        if (this.input) {
            this.input.addEventListener('input', this.callback, false);
        }

        if (this.button) {
            this.button.addEventListener('click', this.onClick.bind(this), false);
        }

        return this;
    };

    Input.prototype.onClick = function () {
        this.hide();
        this.input.value = '';

        return this;
    };

    Input.prototype.setTime = function (time) {

        if (this.time) {
            this.time.innerHTML = time;
        }

        return this;
    };

    Input.prototype.setCount = function (count) {

        if (this.count) {
            this.count.innerHTML = count;
        }

        return this;
    };

    return Input;
})();