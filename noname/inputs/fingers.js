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
		for (var i = 0; i < event.changedTouches.length; i++) {
			if (self.tracked.length < self.limit) {
				self.tracked.push({
					id: event.changedTouches[i].identifier,
					startX: event.changedTouches[i].clientX - _game.render.screen.offsetLeft,
					startY: event.changedTouches[i].clientY - _game.render.screen.offsetTop,
					currentX: event.changedTouches[i].clientX - _game.render.screen.offsetLeft,
					currentY: event.changedTouches[i].clientY - _game.render.screen.offsetTop,
					offsetX: 0,
					offsetY: 0
				});
			}
		}
	}, false);

	_game.render.canvas.addEventListener('touchmove', function (event) {
		event.preventDefault();
		for (var i = 0; i < event.changedTouches.length; i++) {
			var finger = self.get(event.changedTouches[i].identifier);
			finger.currentX = event.changedTouches[i].clientX - _game.render.screen.offsetLeft;
			finger.currentY = event.changedTouches[i].clientY - _game.render.screen.offsetTop;
			finger.offsetX = event.changedTouches[i].clientX - _game.render.screen.offsetLeft - finger.startX;
			finger.offsetY = event.changedTouches[i].clientY - _game.render.screen.offsetTop - finger.startY;
		}
	}, false);

	_game.render.canvas.addEventListener('touchend', function (event) {
		for (var i = 0; i < event.changedTouches.length; i++) {
			var finger = self.get(event.changedTouches[i].identifier);
			self.remove(finger);
		}
	}, false);

	self.get = function (_id) {
		var output = false;
		self.tracked.forEach(function (_finger) {
			if (_finger.id === _id) {
				output = _finger;
			}
		});
		return output;
	};

	self.remove = function (_item) {
		var index = self.tracked.indexOf(_item);
		if (index > -1) {
			self.tracked.splice(index, 1);
		}
	};

};
