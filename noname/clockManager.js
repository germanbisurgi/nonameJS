var ClockManager = function () {
    'use strict';
    var self = this;
    self.master = null;
    self.pool = [];

    self.init = function () {
        self.master = new noname.clock();
    }

    self.init();

    self.update = function (_delta) {
        self.master.update(_delta);
        self.pool.forEach(function (clock) {
            clock.update(_delta);
        });
    };

    self.create = function () {
        var clock = new noname.clock();
        self.pool.push(clock);
        return clock;
    };


};
