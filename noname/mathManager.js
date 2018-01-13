var MathManager = function () {
    "use strict";
    var self = this;

    self.random = function(min, max) {
        return (min + (Math.random() * (max - min)));
    };

    self.randomInt = function(min, max) {
        return Math.round(this.random(min, max));
    };

    self.randomChoice = function(choices) {
        return choices[this.randomInt(0, choices.length-1)];
    };

    self.randomBool = function() {
        return self.randomChoice([true, false]);
    };

    self.clamp = function(x, min, max) {
        return Math.max(min, Math.min(max, x));
    };

    self.between = function(n, min, max) {
        return ((n >= min) && (n <= max));
    };

    self.toRadians = function(_value) {
        return _value * 0.0174532925199432957;
    };

    self.toDegrees = function(_value) {
        return _value * 57.295779513082320876;
    };

    self.distance = function (_x1, _y1, _x2, _y2) {
        return Math.sqrt((_x1 - _x2) * (_x1 - _x2) + (_y1 - _y2) * (_y1 - _y2));
    };

    self.angleToPointer = function (_x1, _y1, _x2, _y2) {
        return self.toDegrees(Math.atan2(_y1 - _y2, _x1 - _x2));
    };

    self.normalize = function (_angle) {
        _angle =  _angle % 360;
        _angle = (_angle + 360) % 360;
        if (_angle > 180) {
            _angle -= 360;
        }
        return _angle;
    };

};
