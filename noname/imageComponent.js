var ImageComponent = function (_image) {
    this.image = _image;
    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = _image.width;
    this.sourceHeight = _image.height;
    this.opacity = 1.0;
    this.crop = function (_x, _y, _w, _h) {
        this.sourceX = _x;
        this.sourceY = _y;
        this.sourceWidth = _w;
        this.sourceHeight = _h;
    }
}
