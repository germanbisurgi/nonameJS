/**
 * This class have a cosy set of Math methods and helpers.
 * @class MathManager
 */
var MathManager = function () {
    "use strict";
    var self = this;

    /**
     * Returns a random number between a min and a max number.
     * @param _min
     * @param _max
     * @returns {number}
     */
    self.random = function(_min, _max) {
        return (_min + (Math.random() * (_max - _min)));
    };

    /**
     * Returns a random rounded number between a min and a max number.
     * @param _min
     * @param _max
     * @returns {number}
     */
    self.randomInt = function(_min, _max) {
        return Math.round(this.random(_min, _max));
    };

    /**
     * Will return a random choice given an array of choices.
     * @param _choices Array of choices.
     * @returns {*}
     */
    self.randomChoice = function(_choices) {
        return _choices[self.randomInt(0, _choices.length-1)];
    };

    /**
     * Returns true or false randomly.
     * @returns {boolean}
     */
    self.randomBool = function() {
        return self.randomChoice([true, false]);
    };

    /**
     * Limit a given number to given min and max boundaries.
     * @param _x
     * @param _min
     * @param _max
     * @returns {number}
     */
    self.clamp = function(_x, _min, _max) {
        return Math.max(_min, Math.min(_max, _x));
    };

    /**
     * Returns true if a number is >= than the min number and
     * <= than the max number.
     * @param _n The number to check.
     * @param _min the min number.
     * @param _max the max number.
     * @returns {boolean}
     */
    self.between = function(_n, _min, _max) {
        return ((_n >= _min) && (_n <= _max));
    };

    /**
     * Converts degrees to radians.
     * @method toRadians
     * @param _degrees
     * @returns {number}
     */
    self.toRadians = function(_degrees) {
        return _degrees * 0.0174532925199432957;
    };

    /**
     * Converts radians to degrees.
     * @method toDegrees
     * @param _radians
     * @returns {number}
     */
    self.toDegrees = function(_radians) {
        return _radians * 57.295779513082320876;
    };

    /**
     * Returns the distance between 2 points.
     * @method distance
     * @param _x1
     * @param _y1
     * @param _x2
     * @param _y2
     * @returns {number}
     */
    self.distance = function (_x1, _y1, _x2, _y2) {
        return Math.sqrt((_x1 - _x2) * (_x1 - _x2) + (_y1 - _y2) * (_y1 - _y2));
    };

    /**
     * Calculate an angle from a given point.
     * @method pointToAngle
     * @param _originX Origin x
     * @param _originY Origin y
     * @param _pointX Point x
     * @param _pointY Point y
     * @returns {number} The angle in radians
     */
    self.pointToAngle = function (_originX, _originY, _pointX, _pointY) {
        return self.toDegrees(Math.atan2(_pointY - _originY, _pointX - _originX));
    };

    /**
     * Calculates a point from a given angle.
     * @function angleToPoint
     * @param _angle an angle in radians.
     * @param _originX Origin x.
     * @param _originY Origin y.
     * @param _radius How far the point will be from the origin.
     * @returns {{x: *, y: *}}
     */
    self.angleToPoint = function (_angle, _originX, _originY, _radius) {
        return {
            x: Math.cos(_angle) * _radius + _originX,
            y: Math.sin(_angle) * _radius + _originY
        }
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
