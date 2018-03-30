var Pointers = function (_game) {
	'use strict';
	var self = this;

	self.started = [];
	self.continued = [];
	self.ended = [];

	_game.render.canvas.addEventListener('touchstart', function (event) {
		event.preventDefault();
		for (var i = 0; i < event.changedTouches.length; i++) {
			var touch = event.changedTouches[i];
			var pointer = {
				number: event.touches.length,
				type: 'touch',
				startX: Math.floor(event.changedTouches[i].clientX - _game.render.screen.offsetLeft),
				startY: Math.floor(event.changedTouches[i].clientY - _game.render.screen.offsetTop),
				currentX: Math.floor(event.changedTouches[i].clientX - _game.render.screen.offsetLeft),
				currentY: Math.floor(event.changedTouches[i].clientY - _game.render.screen.offsetTop),
				milliseconds: 0,
				identifier: touch.identifier,
				startFrame: _game.loop.frames
			};
			self.started.push(pointer);
			self.continued.push(pointer);
		}
	}, false);

	_game.render.canvas.addEventListener('mousedown', function (_event) {
			_event.preventDefault();
			var pointer = {
				number: _event.button,
				type: 'mouse',
				startX: Math.floor(_event.clientX - _game.render.screen.offsetLeft),
				startY: Math.floor(_event.clientY - _game.render.screen.offsetLeft),
				currentX: Math.floor(_event.clientX - _game.render.screen.offsetLeft),
				currentY: Math.floor(_event.clientY - _game.render.screen.offsetLeft),
				milliseconds: 0,
				startFrame: _game.loop.frames
			};
			self.started.push(pointer);
			self.continued.push(pointer);
		}, false);

	_game.render.canvas.addEventListener('touchmove', function (event) {
		event.preventDefault();
		for (var i = 0; i < event.changedTouches.length; i++) {
			var touch = event.changedTouches[i];
			var pointer = self.getByIdentifier(touch.identifier, self.continued);
			pointer.currentX = Math.floor(event.changedTouches[i].clientX - _game.render.screen.offsetLeft);
			pointer.currentY = Math.floor(event.changedTouches[i].clientY - _game.render.screen.offsetTop);
		}
	}, false);

	_game.render.canvas.addEventListener('mousemove', function (_event) {
		_event.preventDefault();
		self.continued.forEach(function (pointer) {
			pointer.currentX = Math.floor(_event.clientX - _game.render.screen.offsetLeft);
			pointer.currentY = Math.floor(_event.clientY - _game.render.screen.offsetLeft);
		});
	}, false);

	_game.render.canvas.addEventListener('touchend', function (event) {
		event.preventDefault();
		for (var i = 0; i < event.changedTouches.length; i++) {
			var touch = event.changedTouches[i];
			var pointer = self.getByIdentifier(touch.identifier, self.continued);
			pointer.releaseFrame = _game.loop.frames;
			self.ended.push(pointer);
			self.remove(pointer, self.continued);
		}
	}, false);

	_game.render.canvas.addEventListener('mouseup', function (_event) {
		_event.preventDefault();
		var pointer = self.getByNumber(_event.button, self.continued);
		pointer.currentX = Math.floor(_event.clientX - _game.render.screen.offsetLeft);
		pointer.currentY = Math.floor(_event.clientY - _game.render.screen.offsetLeft);
		pointer.releaseFrame = _game.loop.frames;
		self.ended.push(pointer);
		self.remove(pointer, self.continued);
	}, false);

	self.update = function () {

		if (self.started.length > 0) {
			self.started.forEach(function (_pointer) {
				if (_pointer.startFrame < _game.loop.frames - 1) {
					self.remove(_pointer, self.started);
				}
			});
		}

		if (self.ended.length > 0) {
			self.ended.forEach(function (_pointer) {
				if (_pointer.releaseFrame < _game.loop.frames - 1) {
					self.remove(_pointer, self.ended);
				}
			});
		}

	};

	self.getByIdentifier = function (_identifier, _array) {
		var output = false;
		_array.forEach(function (_pointer) {
			if (_pointer.identifier === _identifier) {
				output = _pointer;
			}
		});
		return output;
	};

	self.getByNumber = function (_number, _array) {
		var output = false;
		_array.forEach(function (_pointer) {
			if (_pointer.number === _number) {
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

	self.onStart = function (fn) {
		if (self.started.length > 0) {
			fn(self.started);
		}
	};
	
	self.onContinued = function (fn) {
		fn(self.continued);
	};

	self.onEnd = function (fn) {
		fn(self.ended);
	};
	
};
