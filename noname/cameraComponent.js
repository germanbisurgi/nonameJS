var CameraComponent = function (_x, _y, _width, _height) {
    this.x = _x || 0;
    this.y = _y || 0;
    this.width = _width || 50;
    this.height = _height || 50;
    this.anchorX = 0.5;
    this.anchorY = 0.5;
    this.angle = 0;
    this.zoom = 1.0;
    this.lerp = 1;

    this.move = function (_x, _y) {
        this.x += this.clock.toPPS(_x);
        this.y += this.clock.toPPS(_y);
    }
    this.setPosition = function (_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    this.scale = function (_w, _h) {
        this.width *= _w;
        this.height *= _h;
    }
    this.setSize = function (_w, _h) {
        this.width = _w;
        this.height = _h;
    }
    this.rotate = function (_degrees) {
        this.angle += this.clock.toDPS(_degrees);
    }
    this.setAngle = function (_degrees) {
        this.angle = _degrees;
    }
    this.follow = function (_x, _y, _w, _h) {
        var destinationX = this.zoom * (_x + _w  / 2) - (this.width  / 2);
        var destinationY = this.zoom * (_y + _h / 2) - (this.height / 2);
        this.x += (destinationX - this.x) * this.lerp;
        this.y += (destinationY - this.y) * this.lerp;
    }
    this.setZoom = function (_zoom) {
        this.zoom += this.clock.toPPS(_zoom);
    }
    this.setLerp = function (_lerp) {
        this.lerp = _lerp;
    }
}
