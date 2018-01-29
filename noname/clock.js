/**
* Tracking time within a game, synchronize animations and manage time related
* events like setTimeout and setInterval.
* All clocks are updated by the clockManager who has a 'master' clock itself to
* sync created clocks. All entities are synchronizes with the master clock until
* you change it.
* You should not directly instantiate this class because it will not added to The
* clockManager pool and therefore will not be updated. Use the add method on the
* ClockManager instead.
* @class Clock
*/
var Clock = function (_game) {
	"use strict";
	var self = this;
	self.current = 0;

	/**
	 * Is actually the game loop delta.
	 * @property current
	 * @type {Number}
	 */
	self.delta = 0;

	/**
	 * Milliseconds since the Clock was started.
	 * @property current
	 * @type {Number}
	 */
	self.elapsed = 0;

	self.lastTime = 0;

	/**
	 * controls how fast time elapses on that clock.
	 * @property current
	 * @type {Number}
	 */
	self.motion = 1;

	/**
	 * If the clock is paused or not.
	 * @property current
	 * @type {Boolean}
	 */
	self.paused = false;

	/**
	 * Actual delta time divided by desired delta.
	 * @property current
	 * @type {Number}
	 */
	self.rate = 1;

	/**
	 * An array of clock events.
	 * @property current
	 * @type {Array}
	 */
	self.events = [];

	/**
	 * Update the clock properties.
	 * @method update
	 * @param  {Number} _delta The current loop delta.
	 */
	self.update = function (_delta) {
		self.delta = 0;
		if (!self.paused) {
			self.lastTime = self.current;
			self.current = self.lastTime + _delta * self.motion;
			self.delta = self.current - self.lastTime;
			self.rate = self.delta / (1000 / _game.loop.fps);
			self.elapsed += self.delta * self.motion / 2;
			self.updateEvents();
		}
	};

	/**
	 * Calls a function at specified intervals (in milliseconds). It is synchronized
	 * with the clock so motion will be considered in th equation.
	 * @method setInterval
	 * @param  {function} _function The function that will be called.
	 * @param  {number} _milliseconds The interval time in milliseconds.
	 * @param  {object} _context What will be 'this' in the function.
	 * @return {object} event the event that holds the event data.
	 */
	self.setInterval = function (_function, _milliseconds, _context) {
		return self.createEvent(_function, _milliseconds, _context, false);
	};

	/**
	 * Calls a function after a specified number of milliseconds. It is synchronized
	 * with the clock so motion will be considered in th equation.
	 * @method setTimeout
	 * @param  {function} _function The function that will be called.
	 * @param  {number} _milliseconds The interval time in milliseconds.
	 * @param  {object} _context What will be 'this' in the function.
	 * @return {object} event the event that holds the event data.
	 */
	self.setTimeout = function (_function, _milliseconds, _context) {
		return self.createEvent(_function, _milliseconds, _context, true);
	};

	self.createEvent = function (_function, _milliseconds, _context, _once) {
		var event = {
			interval: _milliseconds,
			function: _function.bind(_context),
			elapsed: 0,
			lastElapsed: 0,
			once: _once
		};
		self.events.push(event);
		return event;
	};

	/**
	 * Removes a clock event from the clock events array.
	 * @method clearEvent
	 * @param  {event} _event The event that will be removed.
	 */
	self.clearEvent = function (_event) {
		var index = self.events.indexOf(_event);
		if (index > -1) {
			self.events.splice(index, 1);
		}
	};

	self.updateEvents = function () {
		self.events.forEach(function (_event) {
			_event.elapsed += self.elapsed - _event.lastElapsed;
			if (_event.elapsed >= _event.interval) {
				_event.function();
				if (_event.once) {
					self.clearEvent(_event)
				}
				_event.elapsed = 0;
			}
			_event.lastElapsed = self.elapsed;
		});
	};

	/**
	 * Pauses the clock but not the game.
	 * @method pause
	 */
	self.pause = function() {
		self.paused = true;
	};

	/**
	 * Continues the clock.
	 * @method continue
	 */
	self.continue = function() {
		self.paused = false;
	};

	self.toPPS = function(_velocity) {
		return _velocity * self.delta * self.motion / 1000;
	};

	self.toDPS = function(_degrees) {
		return _degrees * self.delta * self.motion / 1000;
	};

	self.toMSPS = function(_milliseconds) {
		return _milliseconds * self.delta * self.motion;
	};
};
