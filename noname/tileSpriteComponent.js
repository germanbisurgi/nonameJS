var TileSpriteComponent = function (_image) {
    this.image = _image;
    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = _image.width;
    this.sourceHeight = _image.height;
    this.opacity = 1.0;
    this.tempCanvas = null;
    this.tempContext = null;

    this.tempCanvas = document.createElement('canvas');
    this.tempContext = this.tempCanvas.getContext('2d');
    this.tempCanvas.width = this.sourceWidth * 2;
    this.tempCanvas.height = this.sourceHeight * 2;
    this.tempContext.drawImage(this.image, 0, 0, this.sourceWidth * 0.5, this.sourceHeight * 0.5);
    this.tempContext.drawImage(this.image, this.sourceWidth * 0.5, 0, this.sourceWidth * 0.5, this.sourceHeight * 0.5);
    this.tempContext.drawImage(this.image, 0, this.sourceHeight * 0.5, this.sourceWidth * 0.5, this.sourceHeight * 0.5);
    this.tempContext.drawImage(this.image, this.sourceWidth * 0.5, this.sourceHeight * 0.5, this.sourceWidth * 0.5, this.sourceHeight * 0.5);
    this.image = this.tempCanvas;
    this.sourceWidth  *= 0.5;
    this.sourceHeight *= 0.5;

    this.scroll = function (_direction, _velocity) {
        if (_direction ==='left') {
            this.sourceX += this.clock.toPPS(_velocity);
            if (this.sourceX + this.sourceWidth >= this.sourceWidth * 2) {
                this.sourceX = 0;
            }
        }
        if (_direction ==='right') {
            this.sourceX -= this.clock.toPPS(_velocity);
            if (this.sourceX <= 0) {
                this.sourceX = this.sourceWidth;
            }
        }
        if (_direction ==='up') {
            this.sourceY += this.clock.toPPS(_velocity);
            if (this.sourceY + this.sourceHeight >= this.sourceHeight * 2) {
                this.sourceY = 0;
            }
        }
        if (_direction ==='down') {
            this.sourceY -= this.clock.toPPS(_velocity);
            if (this.sourceY <= 0) {
                this.sourceY = this.sourceHeight;
            }
        }
    };
}
