/**
* This manager allows you to add and switch your states. To change from
* game state to main menu state or map A to map B are the daily bread of this manager.
*
* @class StateManager
*/
var StateManager = function (_game) {
    'use strict';
    var self = this;

    /**
    * The current state (active).
    *
    * @property current
    * @type {Object} state  state object.
    */
    self.current = null;

    /**
    * All the states of the game.
    *
    * @property pool
    * @type {Array} Array of state objects.
    */
    self.pool = [];

    /**
    * Add all the states given in the setting object and.
    * if specified in the setting will set the initial state otherwise the first
    * element in the array will be used as initial state.
    *
    * @method init
    */
    self.init = function () {
        _game.settings.states.forEach(function (_state) {
            self.add(_state);
        });
        if (typeof _game.settings.initialState !== 'undefined' && self.get(_game.settings.initialState)) {
            self.switch(_game.settings.initialState);
        } else {
            self.switch(self.pool[0].name);
        }
    };

    /**
    * Adds a new State into the StateManager.
    *
    * @method add
    * @param {Object} state A state object.
    */
    self.add = function(_state) {
        self.pool.push(_state);
    };

    /**
    * Set the given state as current (active) state.
    *
    * @method switch
    * @param {String} stateName The state name you want to switch to.
    */
    self.switch = function(_stateName) {
        self.pool.forEach(function (_state) {
            if (_state.name === _stateName) {
                self.current = _state;
            }
        });
    };

    /**
    * Get a state by name.
    *
    * @method get
    * @param {String} stateName The name of the state you want to retrieve.
    * @return {Object} Returns a state otherwise returns false.
    */
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
