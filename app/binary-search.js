self.addEventListener('message', function (event) {

    'use strict';

    var i,
        matches = [];

    for (i = event.data.arr.length; i--;) {
        if (event.data.arr[i].indexOf(event.data.value) !== -1) {
            matches[matches.length] = i;
        }
    }

    self.postMessage(matches);
}, false);