var Pointers = function (game) {
	'use strict';
	var self = this;

	self.started = [];
	self.continued = [];
	self.ended = [];

	self.touchstartHandler = function (event) {
		event.preventDefault();
		game.utils.fasterEach(event.changedTouches, function (touch) {
			var pointer = {
				number: self.continued.length,
				type: 'finger',
				startX: Math.floor(touch.clientX - game.render.screen.offsetLeft),
				startY: Math.floor(touch.clientY - game.render.screen.offsetTop),
				currentX: Math.floor(touch.clientX - game.render.screen.offsetLeft),
				currentY: Math.floor(touch.clientY - game.render.screen.offsetTop),
				milliseconds: 0,
				identifier: touch.identifier,
				startFrame: game.loop.frames,
				releaseFrame: null
			};
			self.started.push(pointer);
			self.continued.push(pointer);
		})
	};

	self.mouseDownHandler = function (event) {
		event.preventDefault();
		var pointer = {
			number: event.button,
			type: 'mouse',
			startX: Math.floor(event.clientX - game.render.screen.offsetLeft),
			startY: Math.floor(event.clientY - game.render.screen.offsetLeft),
			currentX: Math.floor(event.clientX - game.render.screen.offsetLeft),
			currentY: Math.floor(event.clientY - game.render.screen.offsetLeft),
			milliseconds: 0,
			startFrame: game.loop.frames,
			releaseFrame: null
		};
		self.started.push(pointer);
		self.continued.push(pointer);
	};

	self.touchMoveHandler = function (event) {
		event.preventDefault();
		game.utils.fasterEach(event.changedTouches, function (touch) {
			var pointer = self.getByIdentifier(touch.identifier, self.continued);
			pointer.currentX = Math.floor(touch.clientX - game.render.screen.offsetLeft);
			pointer.currentY = Math.floor(touch.clientY - game.render.screen.offsetTop);
		});
	};

	self.mouseMoveHandler = function (event) {
		event.preventDefault();
		game.utils.fasterEach(self.continued, function (pointer) {
			pointer.currentX = Math.floor(event.clientX - game.render.screen.offsetLeft);
			pointer.currentY = Math.floor(event.clientY - game.render.screen.offsetLeft);
		});
	};

	self.touchEndHandler = function (event) {
		event.preventDefault();
		game.utils.fasterEach(event.changedTouches, function (touch) {
			var pointer = self.getByIdentifier(touch.identifier, self.continued);
			pointer.releaseFrame = game.loop.frames;
			self.ended.push(pointer);
		});
	};

	self.mouseEndHandler = function (event) {
		event.preventDefault();
		var pointer = self.getByNumber(event.button, self.continued);
		if (pointer) {
			pointer.currentX = Math.floor(event.clientX - game.render.screen.offsetLeft);
			pointer.currentY = Math.floor(event.clientY - game.render.screen.offsetLeft);
			pointer.releaseFrame = game.loop.frames;
			self.ended.push(pointer);
		}
	};

	game.render.canvas.addEventListener('touchstart', self.touchstartHandler, false);
	game.render.canvas.addEventListener('mousedown', self.mouseDownHandler, false);
	game.render.canvas.addEventListener('touchmove', self.touchMoveHandler, false);
	game.render.canvas.addEventListener('mousemove', self.mouseMoveHandler, false);
	game.render.canvas.addEventListener('touchend', self.touchEndHandler, false);
	game.render.canvas.addEventListener('touchcancel', self.touchEndHandler, false);
	game.render.canvas.addEventListener('mouseup', self.mouseEndHandler, false);
	game.render.canvas.addEventListener('mouseout', self.mouseEndHandler, false);

	self.update = function () {
		if (self.started.length > 0) {
			game.utils.fasterEachReverse(self.started, function (_pointer) {
				if (_pointer.startFrame < game.loop.frames - 1) {
					self.remove(_pointer, self.started);
				}
			});
		}
		if (self.continued.length > 0) {
			game.utils.fasterEachReverse(self.continued, function (_pointer) {
				if (_pointer.releaseFrame < game.loop.frames - 1) {
					self.remove(_pointer, self.continued);
				}
			});
		}
		if (self.ended.length > 0) {
			game.utils.fasterEachReverse(self.ended, function (_pointer) {
				if (_pointer.releaseFrame < game.loop.frames - 1) {
					self.remove(_pointer, self.ended);
				}
			});
		}
	};

	self.getByIdentifier = function (_identifier, _array) {
		var output = false;
		game.utils.fasterEach(_array, function (_pointer) {
			if (_pointer.identifier === _identifier) {
				output = _pointer;
			}
		});
		return output;
	};

	self.getByNumber = function (_number, _array) {
		var output = false;
		game.utils.fasterEach(_array, function (_pointer) {
			if (_pointer.number === _number) {
				output = _pointer;
			}
		});
		return output;
	};

	self.getByType = function (_type, _array) {
		var output = false;
		game.utils.fasterEach(_array, function (_pointer) {
			if (_pointer.type === _type) {
				output = _pointer;
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

	self.filterPointers = function (array, type, number, fn) {
		game.utils.fasterEach(array, function (pointer) {
			if (type === '*' && number === '*') {
				fn(pointer);
			}
			if (type !== '*' && number !== '*') {
				if (pointer.type === type && pointer.number === Number(number)) {
					fn(pointer);
				}
			}
			if (type !== '*' && number === '*') {
				if (pointer.type === type) {
					fn(pointer);
				}
			}
			if (type === '*' && number !== '*') {
				if (pointer.number === Number(number)) {
					fn(pointer);
				}
			}
		});
	};

	self.onStart = function (type, number, fn) {
		self.filterPointers(self.started, type, number, fn);
	};

	self.onContinued = function (type, number, fn) {
		self.filterPointers(self.continued, type, number, fn);
	};

	self.onEnd = function (type, number, fn) {
		self.filterPointers(self.ended, type, number, fn);
	};
};
