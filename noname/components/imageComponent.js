var ImageComponent = function (_image, _x, _y, _width, _height) {
	'use strict';
	var self = this;
	self.image = _image;
	self.destinationX = _x;
	self.destinationY = _y;
	self.destinationWidth = _width;
	self.destinationHeight = _height;
	self.sourceX = 0;
	self.sourceY = 0;
	self.sourceWidth = _image.width;
	self.sourceHeight = _image.height;
	self.opacity = 1.0;
};
