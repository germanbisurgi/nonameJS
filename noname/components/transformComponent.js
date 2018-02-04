var TransformComponent = function (_x, _y, _width, _height, _angle, _anchorX, _anchorY) {
	'use strict';
	var self = this;
	self.x = _x || 0;
	self.y = _y || 0;
	self.width = _width || 50;
	self.height = _height || 50;
	self.angle = _angle || 0;
	self.anchorX = _anchorX || 0.5;
	self.anchorY = _anchorY || 0.5;

	self.translate = function (_x, _y) {
		self.x += self.owner.clock.toPPS(_x);
		self.y += self.owner.clock.toPPS(_y);
	};

	self.setPosition = function (_x, _y) {
		self.x = _x;
		self.y = _y;
	};

	self.follow = function (_entity) {
		self.setPosition(
			(_entity.x + _entity.width / 2) - (self.width / 2),
			(_entity.y + _entity.height / 2) - (self.height / 2)
		);
	};

	self.scale = function (_w, _h) {
		self.width *= _w;
		self.height *= _h;
	};

	self.setSize = function (_w, _h) {
		self.width = _w;
		self.height = _h;
	};

	self.rotate = function (_degrees) {
		self.angle += self.owner.clock.toDPS(_degrees);
	};

	self.setAngle = function (_degrees) {
		self.angle = _degrees;
	};

	self.setTransform = function (_x, _y, _width, _height, _angle) {
		if (_x || _y) {
			self.setPosition(_x, _y);
		}
		if (_width || _height) {
			self.setSize(_width, _height);
		}
		if (_angle) {
			self.setAngle(_angle);
		}
	};

	self.getTransform = function () {
		return {
			x: self.x,
			y: self.y,
			width: self.width,
			height: self.height,
			angle: self.angle,
			anchorX: self.anchorX,
			anchorY: self.anchorY
		};
	};
};
