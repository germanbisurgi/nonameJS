/**
 * Track fingers touching on the canvas element.
 * @param  {object} _game [description]
 * @class Fingers
 */
var Fingers = function (_game) {
	'use strict';
	var self = this;
	self.tracked = [];
	self.justToucing = [];
	self.releasing = [];

	_game.render.canvas.addEventListener('touchstart', function (event) {
		event.preventDefault();
		for (var i = 0; i < event.changedTouches.length; i++) {
			var touch = event.changedTouches[i];
			var finger = {
				number: event.touches.length,
				startX: Math.floor(event.changedTouches[i].clientX - _game.render.screen.offsetLeft),
				startY: Math.floor(event.changedTouches[i].clientY - _game.render.screen.offsetTop),
				currentX: Math.floor(event.changedTouches[i].clientX - _game.render.screen.offsetLeft),
				currentY: Math.floor(event.changedTouches[i].clientY - _game.render.screen.offsetTop),
				offsetX: 0,
				offsetY: 0,
				milliseconds: 0,
				identifier: touch.identifier,
				startFrame: _game.loop.frames
			};
			self.tracked.push(finger);
			self.justToucing.push(finger);
		}
	}, false);

	_game.render.canvas.addEventListener('touchmove', function (event) {
		event.preventDefault();
		for (var i = 0; i < event.changedTouches.length; i++) {
			var touch = event.changedTouches[i];
			var finger = self.getByIdentifier(touch.identifier, self.tracked);
			finger.currentX = Math.floor(event.changedTouches[i].clientX - _game.render.screen.offsetLeft);
			finger.currentY = Math.floor(event.changedTouches[i].clientY - _game.render.screen.offsetTop);
			finger.offsetX = Math.floor(event.changedTouches[i].clientX - _game.render.screen.offsetLeft - finger.startX);
			finger.offsetY = Math.floor(event.changedTouches[i].clientY - _game.render.screen.offsetTop - finger.startY);
		}

	}, false);

	_game.render.canvas.addEventListener('touchend', function (event) {
		event.preventDefault();
		for (var i = 0; i < event.changedTouches.length; i++) {
			var touch = event.changedTouches[i];
			var finger = self.getByIdentifier(touch.identifier, self.tracked);
			finger.releaseFrame = _game.loop.frames;
			self.releasing.push(finger);
			self.remove(finger, self.tracked);
		}
	}, false);

	self.update = function () {

		logger.log(self.tracked);

		if (self.justToucing.length > 0) {
			self.justToucing.forEach(function (_finger) {
				if (_finger.startFrame < _game.loop.frames - 1) {
					self.remove(_finger, self.justToucing);
				}
			});
		}

		if (self.releasing.length > 0) {
			self.releasing.forEach(function (_finger) {
				if (_finger.releaseFrame < _game.loop.frames - 1) {
					self.remove(_finger, self.releasing);
				}
			});
		}

	};

	self.getByIdentifier = function (_identifier, _array) {
		var output = false;
		_array.forEach(function (_finger) {
			if (_finger.identifier === _identifier) {
				output = _finger;
			}
		});
		return output;
	};

	self.getByNumber = function (_number, _array) {
		var output = false;
		_array.forEach(function (_finger) {
			if (_finger.number === _number) {
				output = _finger;
			}
		});
		return output;
	};

	self.remove = function (_item, _array) {
		var index = _array.indexOf(_item);
		if (index > -1) {
			_array.splice(index, 1);
		}
	};

	/**
	 * Executes a callback function if the finger with the matching id no more
	 * just touched the canvas.
	 * @method justPressed
	 * @param  {Number} _number The finger number.
	 * @param  {Function} _callback A callback function.
	 * @return {Callback}
	 */
	self.touching = function (_number, _callback) {
		var finger = self.getByNumber(_number, self.tracked);
		if (finger) {
			_callback(finger);
		}
	};

	/**
	 * Executes a callback function if the finger with the matching id no more
	 * touches the canvas.
	 * @method released
	 * @param  {Number} _number The finger number.
	 * @param  {Function} _callback A callback function.
	 */
	self.released = function (_number, _callback) {
		var finger = self.getByNumber(_number, self.releasing);
		if (finger) {
			_callback(finger);
		}
	};

	/**
	 * Executes a callback function if the finger with the matching id no more
	 * just touched the canvas.
	 * @method justPressed
	 * @param  {Number} _number The finger number.
	 * @param  {Function} _callback A callback function.
	 * @return {Callback}
	 */
	self.justTouched = function (_number, _callback) {
		var finger = self.getByNumber(_number, self.justToucing);
		if (finger) {
			_callback(finger);
		}
	};

};
