var Mouse = function (_game) {
	'use strict';
	var self = this;
	self.x = 0;
	self.y = 0;
	self.tracked = [];
	self.justPressing = [];
	self.releasing = [];

	_game.render.canvas.addEventListener('mousedown', function (_event) {
		_event.preventDefault();
		self.updateXY(_event);
		var button = {
			number: _event.button,
			x: self.x,
			y: self.y,
			milliseconds: 0,
			startFrame: _game.loop.frames
		};
		self.tracked.push(button);
		self.justPressing.push(button);
	}, false);

	_game.render.canvas.addEventListener('mousemove', function (_event) {
		_event.preventDefault();
		self.updateXY(_event);
	}, false);

	_game.render.canvas.addEventListener('mouseup', function (_event) {
		_event.preventDefault();
		self.updateXY(_event);
		var button = self.getByNumber(_event.button, self.tracked);
		button.x = self.x;
		button.y = self.y;
		button.releaseFrame = _game.loop.frames;
		self.releasing.push(button);
		self.remove(button, self.tracked);
	}, false);

	self.remove = function (_item, _array) {
		var index = _array.indexOf(_item);
		if (index > -1) {
			_array.splice(index, 1);
		}
	};

	self.getByNumber = function (_number, _array) {
		var output = false;
		_array.forEach(function (_item) {
			if (_item.number === _number) {
				output = _item;
			}
		});
		return output;
	};

	self.updateXY = function (_event) {
		self.x = Math.floor(_event.clientX - _game.render.screen.offsetLeft);
		self.y = Math.floor(_event.clientY - _game.render.screen.offsetLeft);
	};

	self.update = function () {

		self.tracked.forEach(function (_button) {
			_button.milliseconds += _game.time.masterClock.delta;
		});

		if (self.justPressing.length > 0) {
			self.justPressing.forEach(function (_button) {
				if (_button.startFrame < _game.loop.frames - 1) {
					self.remove(_button, self.justPressing);
				}
			});
		}

		if (self.releasing.length > 0) {
			self.releasing.forEach(function (_button) {
				if (_button.releaseFrame < _game.loop.frames - 1) {
					self.remove(_button, self.releasing);
				}
			});
		}

	};

	self.pressing = function (_number, _callback) {
		var button = self.getByNumber(_number, self.tracked);
		if (button) {
			_callback(button);
		}
	};

	self.released = function (_number, _callback) {
		var button = self.getByNumber(_number, self.releasing);
		if (button) {
			_callback(button);
		}
	};

	self.justPressed = function (_number, _callback) {
		var button = self.getByNumber(_number, self.justPressing);
		if (button) {
			_callback(button);
		}
	};

};
