var MatrixComponent = function (_x, _y, _width, _height) {
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
}
