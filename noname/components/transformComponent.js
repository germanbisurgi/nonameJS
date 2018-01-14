var TransformComponent = function (_x, _y, _width, _height) {
    this.x = _x || 0;
    this.y = _y || 0;
    this.width = _width || 50;
    this.height = _height || 50;
    this.anchorX = 0.5;
    this.anchorY = 0.5;
    this.angle = 0;
    this.move = function (_x, _y) {
        this.x += this.clock.toPPS(_x);
        this.y += this.clock.toPPS(_y);
    };
    this.setPosition = function (_x, _y) {
        this.x = _x;
        this.y = _y;
    };
    this.follow = function (_entity) {
        this.setPosition(
            (_entity.x + _entity.width  / 2) - (this.width  / 2),
            (_entity.y + _entity.height / 2) - (this.height / 2)
        );
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
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            angle: this.angle
        }
    }
};
