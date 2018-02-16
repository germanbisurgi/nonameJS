/**
 * A TimeEvent hooks into a Clock and is an object that is generated when you
 * are wanting to executed a callback at a specific point in time.
 * @class TimeEvent
 */
var TimeEvent = function (_function, _milliseconds, _context, _once) {
	'use strict';
	var self = this;

	/**
	 * Time in milliseconds before the event occurs.
	 * @property interval
	 * @type {Number}
	 */
	self.interval = _milliseconds;

	/**
	 * The function that is to be executed when the event occurs.
	 * @property function
	 * @type {function}
	 */
	self.function = _function;

	/**
	 * Elapsed time in milliseconds sice creation of this object.
	 * @property elapsed
	 * @type {Number}
	 */
	self.elapsed = 0;
	self.lastElapsed = 0;

	/**
	 * If the event should occur once or executed again.
	 * @property once
	 * @type {Bollean}
	 */
	self.once = _once;

	self.init = function () {
		if (self.function) {
			self.function.bind(_context);
		}
	};

	self.init();
};
