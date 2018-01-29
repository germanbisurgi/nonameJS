var TileSpriteComponent = function (_image) {
    'use strict';
    var self = this;
    self.image = _image;
    self.sourceX = 0;
    self.sourceY = 0;
    self.sourceWidth = _image.width;
    self.sourceHeight = _image.height;
    self.opacity = 1.0;
    self.tempCanvas = null;
    self.tempContext = null;

    self.tempCanvas = document.createElement('canvas');
    self.tempContext = self.tempCanvas.getContext('2d');
    self.tempCanvas.width = self.sourceWidth * 2;
    self.tempCanvas.height = self.sourceHeight * 2;
    self.tempContext.drawImage(self.image, 0, 0, self.sourceWidth * 0.5, self.sourceHeight * 0.5);
    self.tempContext.drawImage(self.image, self.sourceWidth * 0.5, 0, self.sourceWidth * 0.5, self.sourceHeight * 0.5);
    self.tempContext.drawImage(self.image, 0, self.sourceHeight * 0.5, self.sourceWidth * 0.5, self.sourceHeight * 0.5);
    self.tempContext.drawImage(self.image, self.sourceWidth * 0.5, self.sourceHeight * 0.5, self.sourceWidth * 0.5, self.sourceHeight * 0.5);
    self.image = self.tempCanvas;
    self.sourceWidth  *= 0.5;
    self.sourceHeight *= 0.5;

    self.scroll = function (_direction, _velocity) {
        if (_direction ==='left') {
            self.sourceX += self.owner.clock.toPPS(_velocity);
            if (self.sourceX + self.sourceWidth >= self.sourceWidth * 2) {
                self.sourceX = 0;
            }
        }
        if (_direction ==='right') {
            self.sourceX -= self.owner.clock.toPPS(_velocity);
            if (self.sourceX <= 0) {
                self.sourceX = self.sourceWidth;
            }
        }
        if (_direction ==='up') {
            self.sourceY += self.owner.clock.toPPS(_velocity);
            if (self.sourceY + self.sourceHeight >= self.sourceHeight * 2) {
                self.sourceY = 0;
            }
        }
        if (_direction ==='down') {
            self.sourceY -= self.owner.clock.toPPS(_velocity);
            if (self.sourceY <= 0) {
                self.sourceY = self.sourceHeight;
            }
        }
    };
};
