var StateManager = function (_config) {
    'use strict';
    var self = this;
    self.current = null;
    self.pool = [];

    self.init = function () {
        _config.states.forEach(function (_state) {
            self.add(_state);
        });
        if (typeof _config.initialState !== 'undefined' && self.get(_config.initialState)) {
            self.switch(_config.initialState);
        } else {
            self.switch(self.pool[0].name);
        }
    };

    self.add = function(_state) {
        self.pool.push(_state);
    };

    self.switch = function(_stateName) {
        self.pool.forEach(function (_state) {
            if (_state.name === _stateName) {
                self.current = _state;
            }
        });
    };

    self.get = function(_name) {
        var output = false;
        self.pool.forEach(function (_state) {
            if (_state.name === _name) {
                output = _state;
            }
        });
        return output;
    };

    self.init();

};
