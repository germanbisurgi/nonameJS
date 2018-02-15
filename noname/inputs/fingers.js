/**
 * Track fingers touching on the canvas element.
 * @param  {object} _game [description]
 * @class Fingers
 */
var Fingers = function (_game) {
	'use strict';
	var self = this;
	self.tracked = [];
	self.limit = 10;

	_game.render.canvas.addEventListener('touchstart', function (event) {
		event.preventDefault();
		for (var i = 0; i < event.changedTouches.length; i++) {
			//if (self.tracked.length < self.limit) {
				var finger = {
					id: event.changedTouches[i].identifier,
					startX: event.changedTouches[i].clientX - _game.render.screen.offsetLeft,
					startY: event.changedTouches[i].clientY - _game.render.screen.offsetTop,
					currentX: event.changedTouches[i].clientX - _game.render.screen.offsetLeft,
					currentY: event.changedTouches[i].clientY - _game.render.screen.offsetTop,
					offsetX: 0,
					offsetY: 0,
					justTouched: true,
					touching: true,
					released: false,
					milliseconds: 0,
					pressFrame: _game.loop.frames,
					releaseFrame: _game.loop.frames
				}
				logger.log(finger, i)

				self.tracked.push(finger);
			//}
		}
	}, false);

	_game.render.canvas.addEventListener('touchmove', function (event) {
		event.preventDefault();
		for (var i = 0; i < event.changedTouches.length; i++) {
			var finger = self.getByDistance(event.changedTouches[i]);
			finger.currentX = event.changedTouches[i].clientX - _game.render.screen.offsetLeft;
			finger.currentY = event.changedTouches[i].clientY - _game.render.screen.offsetTop;
			finger.offsetX = event.changedTouches[i].clientX - _game.render.screen.offsetLeft - finger.startX;
			finger.offsetY = event.changedTouches[i].clientY - _game.render.screen.offsetTop - finger.startY;
		}
	}, false);

	_game.render.canvas.addEventListener('touchend', function (event) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			var finger = self.getByDistance(event.changedTouches[i]);
			finger.touching = false;
			finger.released = true;
			finger.milliseconds = 0;
			finger.releaseFrame = _game.loop.frames;
			finger.pressFrame = 0;
		}
	}, false);

	self.update = function () {
		if (self.tracked.length > 0) {
			for (var finger in self.tracked) {

			//	logger.log(self.tracked[finger]);


				if (self.tracked[finger].touching) {
					self.tracked[finger].milliseconds += _game.time.masterClock.delta;
				}

				if (self.tracked[finger].released && self.tracked[finger].releaseFrame === _game.loop.frames - 1) {
					self.tracked[finger].released = true;
				} else {
					self.tracked[finger].released = false;
				}

				if (self.tracked[finger].touching && self.tracked[finger].pressFrame === _game.loop.frames - 1) {
					self.tracked[finger].justTouched = true;
				} else {
					self.tracked[finger].justTouched = false;
				}

			}
		}

	};

	self.distance = function (_x1, _y1, _x2, _y2) {
		return Math.sqrt((_x1 - _x2) * (_x1 - _x2) + (_y1 - _y2) * (_y1 - _y2));
	};

	self.getByDistance = function (_touch) {
		var output = false;
		var cachedDistance = 999999999999999;
		self.tracked.forEach(function (_finger) {

			var distance = self.distance(
				_touch.clientX  - _game.render.screen.offsetLeft,
				_touch.clientY - _game.render.screen.offsetTop,
				_finger.currentX,
				_finger.currentY
			)

			if (distance < cachedDistance) {
				output = _finger;
			}

		});
		return output;
	};

	self.get = function (_id) {
		var output = false;
		self.tracked.forEach(function (_finger) {
			if (_finger.id === _id) {
				output = _finger;
			}
		});
		return output;
	};

	/**
	 * Executes a callback function if the finger with the matching id no more
	 * just touched the canvas.
	 * @method justPressed
	 * @param  {Number} _id The finger id.
	 * @param  {Function} _callback A callback function.
	 * @return {Callback}
	 */
	self.justTouched = function (_id, _callback) {
		if (!self.tracked[_id]) {
			return false;
		} else if (self.tracked[_id].justTouched) {
			_callback(self.tracked[_id]);
		}
	};

	/**
	 * Executes a callback function if the finger with the matching id no more
	 * touches the canvas.
	 * @method released
	 * @param  {Number} _id The finger id.
	 * @param  {Function} _callback A callback function.
	 */
	self.released = function (_id, _callback) {
		if (!self.tracked[_id]) {
			return false;
		} else if (self.tracked[_id].released) {
			_callback(self.tracked[_id]);
		}
	};

	/**
	 * Executes a callback function if the finger with the matching id is
	 * touching the canvas.
	 * @method touching
	 * @param  {Number} _id The finger id.
	 * @param  {Function} _callback A callback function. It holds the millisecond since the
	 * finger touched the canvas.
	 */
	self.touching = function (_id, _callback) {
		if (!self.tracked[_id]) {
			return false;
		} else if (self.tracked[_id].touching) {
			_callback(self.tracked[_id]);
		}
	};

};
