var Clock = function () {
    "use strict";
    var self = this;
    self.lastTime = 0;
    self.current = 0;
    self.delta = 0;
    self.motion = 1;
    self.paused = false;

    self.update = function (_delta) {
        self.delta = 0;
        if (!self.paused) {
            self.lastTime = self.current;
            self.current = self.lastTime + _delta * self.motion;
            self.delta = self.current - self.lastTime;
        }
    };

    self.pause = function() {
        self.paused = true;
    };

    self.continue = function() {
        self.paused = false;
    };

    self.toPPS = function(_velocity) {
        return _velocity * self.delta * self.motion / 1000;
    };

    self.toDPS = function(_degrees) {
        return _degrees * self.delta * self.motion / 1000;
    };

    self.toMSPS = function(_miliseconds) {
        return _miliseconds * self.delta * self.motion;
    };
};
