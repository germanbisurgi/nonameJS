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
		// push to tracked
		for (var i = 0; i < event.changedTouches.length; i++) {
			var touch = event.changedTouches[i];
			var number = i;
			var finger = {
				number: number,
				startX: event.changedTouches[i].clientX - _game.render.screen.offsetLeft,
				startY: event.changedTouches[i].clientY - _game.render.screen.offsetTop,
				currentX: event.changedTouches[i].clientX - _game.render.screen.offsetLeft,
				currentY: event.changedTouches[i].clientY - _game.render.screen.offsetTop,
				offsetX: 0,
				offsetY: 0,
				milliseconds: 0,
				identifier: touch.identifier,
				startFrame: _game.loop.frames
			}
			self.tracked.push(finger);
			self.justToucing.push(finger);
		}
	}, false);

	_game.render.canvas.addEventListener('touchmove', function (event) {
		event.preventDefault();
		//get by identifier and update it
		for (var i = 0; i < event.changedTouches.length; i++) {
			var touch = event.changedTouches[i];
			var finger = self.getByIdentifier(touch.identifier, self.tracked);
			finger.currentX = event.changedTouches[i].clientX - _game.render.screen.offsetLeft;
			finger.currentY = event.changedTouches[i].clientY - _game.render.screen.offsetTop;
			finger.offsetX = event.changedTouches[i].clientX - _game.render.screen.offsetLeft - finger.startX;
			finger.offsetY = event.changedTouches[i].clientY - _game.render.screen.offsetTop - finger.startY;
		}


	}, false);

	_game.render.canvas.addEventListener('touchend', function (event) {
		event.preventDefault();
		//get by identifier and remove it
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

		// update just touched array.
		if (self.justToucing.length > 0) {
			self.justToucing.forEach(function (_finger) {
				if (_finger.startFrame < _game.loop.frames - 1) {
					self.remove(_finger, self.justToucing);
				}
			});
		}

		// update released array.
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

	self.touching = function (_number, _callback) {
		var finger = self.getByNumber(_number, self.tracked)
		if (finger) {
			_callback(finger);
		}
	};

	self.released = function (_number, _callback) {
		var finger = self.getByNumber(_number, self.releasing)
		if (finger) {
			_callback(finger);
		}
	};

	self.justTouched = function (_number, _callback) {
		var finger = self.getByNumber(_number, self.justToucing)
		if (finger) {
			_callback(finger);
		}
	};


};
