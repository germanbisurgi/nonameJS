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
				justPressed: true,
				pressed: true,
				released: false,
				milliseconds: 0,
				pressFrame: _game.loop.frames,
				releaseFrame: _game.loop.frames
			};
		} else {
			self.tracked[event.key].pressed = true;
			if (self.tracked[event.key].pressFrame === 0) {
				self.tracked[event.key].pressFrame = _game.loop.frames;
			}
		}
	}, false);

	document.addEventListener('keyup', function (event) {
		event.preventDefault();
		self.tracked[event.key].pressed = false;
		self.tracked[event.key].released = true;
		self.tracked[event.key].milliseconds = 0;
		self.tracked[event.key].releaseFrame = _game.loop.frames;
		self.tracked[event.key].pressFrame = 0;
	}, false);

	self.update = function () {

		for (var key in self.tracked) {

			if (self.tracked[key].pressed) {
				self.tracked[key].milliseconds += _game.time.masterClock.delta;
			}

			if (self.tracked[key].released && self.tracked[key].releaseFrame === _game.loop.frames - 1) {
				self.tracked[key].released = true;
			} else {
				self.tracked[key].released = false;
			}

			if (self.tracked[key].pressed && self.tracked[key].pressFrame === _game.loop.frames - 1) {
				self.tracked[key].justPressed = true;
			} else {
				self.tracked[key].justPressed = false;
			}

		}

	};

	/**
	 * Executes a callback function if the passed key was just pressed.
	 *
	 * @method justPressed
	 * @param  {String} _key The key.
	 * @param  {Function} _callback A callback function.
	 */
	self.justPressed = function (_key, _callback) {
		if (!self.tracked[_key]) {
			return false;
		} else if (self.tracked[_key].justPressed) {
			_callback();
		}
	};

	/**
	 * Executes a callback function if the passed key was pressed.
	 *
	 * @method released
	 * @param  {String} _key The key.
	 * @param  {Function} _callback A callback function.
	 */
	self.released = function (_key, _callback) {
		if (!self.tracked[_key]) {
			return false;
		} else if (self.tracked[_key].released) {
			_callback();
		}
	};

	/**
	 * Executes a callback function if the passed key was pressed.
	 *
	 * @method pressing
	 * @param  {string} _key The key.
	 * @param  {Function} _callback A callback function. It holds the millisecond since the
	 * key was pressed.
	 */
	self.pressing = function (_key, _callback) {
		if (!self.tracked[_key]) {
			return false;
		} else if (self.tracked[_key].pressed) {
			_callback(self.tracked[_key].milliseconds);
		}
	};
};
