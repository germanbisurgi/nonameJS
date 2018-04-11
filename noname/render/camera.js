var Camera = function (_x, _y, _width, _height) {
	this.x = _x || 0;
	this.y = _y || 0;
	this.width = _width || 50;
	this.height = _height || 50;
	this.anchorX = 0.5;
	this.anchorY = 0.5;
	this.angle = 0;
	this.zoom = 1.0;
	this.lerp = 0.1;

	this.move = function (_x, _y) {
		this.x += this.clock.toPPS(_x);
		this.y += this.clock.toPPS(_y);
	};
	this.setPosition = function (_x, _y) {
		this.x = _x;
		this.y = _y;
	};
	this.scale = function (_w, _h) {
		this.width *= _w;
		this.height *= _h;
	};
	this.setSize = function (_w, _h) {
		this.width = _w;
		this.height = _h;
	};
	this.rotate = function (_degrees) {
		this.angle += this.clock.toDPS(_degrees);
	};
	this.setAngle = function (_degrees) {
		this.angle = _degrees;
	};
	this.setTransform = function (_x, _y, _width, _height, _angle) {
		if (_x || _y) {
			this.setPosition(_x, _y);
		}
		if (_width || _height) {
			this.setSize(_width, _height);
		}
		if (_angle) {
			this.setAngle(_angle);
		}
	};
	this.getTransform = function () {
		// this can kill performance(object creation in loop)
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			angle: this.angle
		};
	};
	this.follow = function (x, y) {
		this.x += (this.zoom * (x) - (this.width / 2) - this.x) * this.lerp;
		this.y += (this.zoom * (y) - (this.height / 2) - this.y) * this.lerp;
	};
	this.setZoom = function (_zoom) {
		this.zoom += this.clock.toPPS(_zoom);
		if (this.zoom < 0) {
			this.zoom = 0;
		}
	};
};
