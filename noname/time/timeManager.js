/**
 * Manages all the game game clocks. Per default only one clock, the "Master Clock"
 * is created and added to this manager as a property (not in its pool).
 * the master clock synchronizes a lot of game activities like sprite animations,
 * timers, ecc.If you want to apply a different clock with different properties
 * you have to create a new clock for that. For example if you want that only
 * entities of a certain type move in slow motion you must to create a new clock
 * add it to this entities and change the motion property of that clock.
 * New clocks should always be created with the clock manager create method
 * otherwise it will be not updated.
 * @param  {object} _game a reference to the game.
 * @class TimeManager
 */
var TimeManager = function (_game) {
	'use strict';
	var self = this;

	/**
	 * The default clock that synchronizes the game artifacts (animations, timers, ecc).
	 * @property masterClock
	 * @type {Clock}
	 */
	self.masterClock = null;

	/**
	 * The collection of created clocks.
	 * @property pool
	 * @type {Array}
	 */
	self.pool = [];

	self.init = function () {
		self.masterClock = self.create();
	};

	self.update = function (_delta) {
		self.pool.forEach(function (clock) {
			clock.update(_delta);
		});
	};

	self.add = function (_clock) {
		self.pool.push(_clock);
	};

	/**
	 * Creates a new clock and add it to the clocks pool.
	 * @method create
	 * @return {Clock}
	 */
	self.create = function () {
		var clock = new noname.clock(_game);
		self.add(clock);
		return clock;
	};

	self.init();

};
