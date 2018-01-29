var ImageComponent = function (_image) {
    'use strict';
    var self = this;
    self.image = _image;
    self.sourceX = 0;
    self.sourceY = 0;
    self.sourceWidth = _image.width;
    self.sourceHeight = _image.height;
    self.opacity = 1.0;

    self.crop = function (_x, _y, _width, _height) {
        self.sourceX = _x;
        self.sourceY = _y;
        self.sourceWidth = _width;
        self.sourceHeight = _height;
    }
};
