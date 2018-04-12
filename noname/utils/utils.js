var Utils = function () {
    'use strict';
    var self = this;

    self.fasterEach = function (array, fn, thisContext) {
        var length = array.length;
        var i;
        for (i = 0; i < length; i++) {
            fn(array[i], i, array);
        }
    };

    self.fasterEachReverse = function (array, fn, thisContext) {
        var length = array.length;
        var i;
        for (var i = length - 1; i >= 0; i--) {
            fn(array[i], i, array);
        }
    };

    self.extend = function (out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) {
                continue;
            }
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    out[key] = arguments[i][key];
                }
            }
        }
        return out;
    };
}

