/**
* This manager allows you to add and switch your states. To change from
* game state to main menu state or map A to map B are the daily bread of this manager.
* @class StateManager
*/
var StateManager = function (_game) {
	'use strict';
	var self = this;

	/**
	* The current state that is being played.
	* @property current
	* @type {Object}
	*/
	self.current = null;

	/**
	* The array holding all the states of the game.
	* @property pool
	* @type {Array}
	*/
	self.pool = [];

	/**
	* Add all the states given in the game setting object.
	* If specified in the game settings will set the initial state otherwise the first
	* element in the array will be used as initial state.
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
	* Adds a new state object to the pool.
	* @method add
	* @param {Object} _state The state object you want to add to the pool.
	*/
	self.add = function (_state) {
		self.pool.push(_state);
	};

	/**
	* Set the given state as current (active) state.
	* @method switch
	* @param {String} _stateName The state name you want to switch to.
	*/
	self.switch = function (_stateName) {
		self.pool.forEach(function (_state) {
			if (_state.name === _stateName) {
				self.current = _state;
				self.current.justEntered = true;
			}
		});
	};

	/**
	* Get a state by name.
	* @method get
	* @param {String} _stateName The name of the state you want to retrieve.
	* @return {Object} Returns a state otherwise returns false.
	*/
	self.get = function (_stateName) {
		var output = false;
		self.pool.forEach(function (_state) {
			if (_state.name === _stateName) {
				output = _state;
			}
		});
		return output;
	};

	/**
	 * Switch to the next state in the states array.
	 * @method switchNext
	 */
	self.switchNext = function () {
		var currentIndex = self.pool.indexOf(self.current);
		var nextIndex = (currentIndex + 1) % self.pool.length;
		self.switch(self.pool[nextIndex].name);
	};

	/**
	 * Switch to the previous state in the states array.
	 * @method switchPrevious
	 */
	self.switchPrevious = function () {
		var currentIndex = self.pool.indexOf(self.current);
		var previousIndex = currentIndex - 1;
		if (previousIndex < 0) {
			previousIndex = self.pool.length - 1;
		}
		self.switch(self.pool[previousIndex].name);
	};

	self.init();
};
