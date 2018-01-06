var ClockManager = function (_game) {
    'use strict';
    var self = this;
    self.master = null;
    self.pool = [];

    self.init = function () {
        self.master = self.create();
    }

    self.update = function (_delta) {
        self.master.update(_delta);
        self.pool.forEach(function (clock) {
            clock.update(_delta);
        });
    };

    self.add = function (_clock) {
        self.pool.push(_clock);
    };

    self.create = function () {
        var clock = new noname.clock(_game);
        self.add(clock);
        return clock;
    };

    self.init();

};
