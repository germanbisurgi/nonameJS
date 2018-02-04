/**
 * Keyboards allows to listen if a specific key was pressed, being holded or released
 * @class Keys
 */
var Keys = function (_game) {
	'use strict';
	var self = this;

	/**
	 * Keys that are being tracked. As soon as a key is pressed it will be tracked.
	 * @property tracked
	 * @type {Object}
	 */
	self.tracked = {};

	document.addEventListener('keydown', function (event) {
		event.preventDefault();
		if (!self.tracked[event.key]) {
			self.tracked[event.key] = {
				pressed: true,
				released: false,
				justReleased: true,
				milliseconds: 0
			};
		} else {
			self.tracked[event.key].pressed = true;
		}

	}, false);

	document.addEventListener('keyup', function (event) {
		event.preventDefault();
		self.tracked[event.key].pressed = false;
		self.tracked[event.key].released = true;
		self.tracked[event.key].justReleased = true;
		self.tracked[event.key].milliseconds = 0;
	}, false);

	self.update = function () {
		for (var key in self.tracked) {

			if (self.tracked[key].pressed) {
				self.tracked[key].milliseconds += _game.clock.master.delta;
			}

			if (self.tracked[key].justReleased) {
				self.tracked[key].justReleased = false;
			} else {
				self.tracked[key].released = false;
			}

		}
	};

	/**
	 * Return true if the passed key is being was holded.
	 *
	 * @method holding
	 * @param  {string} _key The key.
	 * @param  {int} _milliseconds Holding time.
	 */
	self.holding = function (_key, _milliseconds) {
		if (!self.tracked[_key]) {
			return false;
		} else {
			return self.tracked[_key].pressed && self.tracked[_key].milliseconds >= _milliseconds;
		}
	};

	/**
	 * Return true if the passed key was pressed.
	 *
	 * @method pressing
	 * @param  {string} _key The key.
	 */
	self.releasing = function (_key) {
		if (!self.tracked[_key]) {
			return false;
		} else {
			return self.tracked[_key].released;
		}
	};

	/**
	 * Return true if the passed key was pressed.
	 *
	 * @method pressing
	 * @param  {string} _key The key.
	 */
	self.pressing = function (_key) {
		if (!self.tracked[_key]) {
			return false;
		} else {
			return self.tracked[_key].pressed;
		}
	};
};
