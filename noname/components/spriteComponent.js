var SpriteComponent = function (_image, _x, _y, _width, _height, _sourceWidth, _sourceHeight) {
	'use strict';
	var self = this;
	self.image = _image;
	self.destinationX = _x;
	self.destinationY = _y;
	self.destinationWidth = _width;
	self.destinationHeight = _height;
	self.sourceX = 0;
	self.sourceY = 0;
	self.sourceWidth = _sourceWidth;
	self.sourceHeight = _sourceHeight;
	self.opacity = 1.0;

	self.delay = 0;
	self.counter = 0;
	self.animations = [];
	self.lastAnimation = null;

	self.addAnimation = function (_name, _sequence) {
		if (!self.getAnimation(_name)) {
			self.animations.push({
				name: _name,
				sequence: _sequence
			});
		}
	};

	self.getAnimation = function (_animationName) {
		var output = false;
		self.animations.forEach(function (animation) {
			if (animation.name === _animationName) {
				output = animation;
			}
		});
		return output;
	};

	self.play = function (_animationName, _delay) {
		if (!self.owner.clock.paused) {
			var animation = self.getAnimation(_animationName);
			if (animation) {
				self.lastAnimation = _animationName;
				var columns = self.image.width / self.sourceWidth;
				self.delay += self.owner.clock.delta * self.owner.clock.motion;
				if (self.delay >= _delay) {
					self.counter = (self.counter + 1) % animation.sequence.length;
					self.delay = 0;
				}
				self.sourceY = Math.floor((animation.sequence[self.counter] + 1) / columns) * self.sourceHeight;
				self.sourceX = self.sourceWidth * animation.sequence[self.counter] - self.image.width * self.sourceY / self.sourceHeight;
			}
		}
	};
};
