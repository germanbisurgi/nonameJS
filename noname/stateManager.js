var StateManager = function (_states, _initialState) {
    'use strict';
    var self = this;
    self.current = null;
    self.pool = [];

    self.init = function () {
        _states.forEach(function (_state) {
            self.add(_state);
        });
        if (typeof _initialState !== 'undefined') {
            self.switch(_initialState);
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

    self.init();

};
