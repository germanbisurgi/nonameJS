/**
 * Keyboards allows to listen if a specific key was pressed, being holded or released
 * @class Keyboard
 */
var Keyboard = function (_game) {
	'use strict';
	var self = this;

	self.keys = {};

	document.addEventListener('keydown', function (event) {
		event.preventDefault();
		if (!self.keys[event.key]) {
			self.keys[event.key] = {
				pressed: true,
				milliseconds: 0
			};
		} else {
			self.keys[event.key].pressed = true;
		}

	}, false);

	document.addEventListener('keyup', function (event) {
		event.preventDefault();
		self.keys[event.key].pressed = false;
		self.keys[event.key].milliseconds = 0;
	}, false);

	self.update = function () {
		for (var key in self.keys) {
			if (self.keys[key].pressed) {
				self.keys[key].milliseconds += _game.clock.master.delta;
			}
		}
	};

	/**
	 * Return true if the passed key is being pressed or holded.
	 *
	 * @method pressing
	 * @param  {string} _key The key.
	 * @param  {int} _milliseconds elapsed time in milliseconds since the key was pressed.
	 */
	self.pressing = function (_key, _milliseconds) {
		if (!_milliseconds) {
			_milliseconds = 0;
		}
		if (!self.keys[_key]) {
			return false;
		} else {
			return self.keys[_key].pressed && self.keys[_key].milliseconds >= _milliseconds;
		}
	};
};
