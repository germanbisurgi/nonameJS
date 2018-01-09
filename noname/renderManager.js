var RenderManager = function (_game) {
    'use strict';
    var self = this;
    self.canvas = null;
    self.context = null;
    self.camera = _game.entities.addCamera(0, 0, 0, 0);
    self.screen = _game.settings.screen;

    self.init = function () {
        self.canvas = document.createElement('canvas');
        self.canvas.setAttribute('style', 'position: absolute;');
        // use with resizeFit
        self.context = self.canvas.getContext("2d");
        self.screen.appendChild(self.canvas);
    }

    self.scale = function () {
        self.screen.setAttribute('style', 'height: 100vh; width: 100vw;');

        self.canvas.width = _game.settings.screen.clientWidth;
        self.canvas.height = _game.settings.screen.clientHeight;
        self.camera.width = self.canvas.width;
        self.camera.height = self.canvas.height;
    };

    self.resolution = function () {
        var devicePixelRatio = window.devicePixelRatio || 1;
        var backingStoreRatio = self.context.webkitBackingStorePixelRatio ||
                            self.context.mozBackingStorePixelRatio ||
                            self.context.msBackingStorePixelRatio ||
                            self.context.oBackingStorePixelRatio ||
                            self.context.backingStorePixelRatio || 1;

        var ratio = devicePixelRatio / backingStoreRatio;

        if (devicePixelRatio !== backingStoreRatio) {
            var oldWidth = _game.settings.screen.clientWidth;
            var oldHeight = _game.settings.screen.clientHeight;
            self.canvas.width = oldWidth * ratio;
            self.canvas.height = oldHeight * ratio;
            self.canvas.style.width = oldWidth + 'px';
            self.canvas.style.height = oldHeight + 'px';
            self.context.scale(ratio, ratio);
            self.camera.width = self.canvas.width;
            self.camera.height = self.canvas.height;
        }
    }


    self.scaleFit = function () {
        var widthToHeight = 640 / 480;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        self.screen.setAttribute('style', 'position: absolute; left: 50%; top: 50%;');


        if (newWidthToHeight > widthToHeight) {
            // window width is too wide relative to desired game width
            newWidth = newHeight * widthToHeight;
            self.screen.style.height = newHeight + 'px';
            self.screen.style.width = newWidth + 'px';
        } else {
            // window height is too high relative to desired game height
            newHeight = newWidth / widthToHeight;
            self.screen.style.width = newWidth + 'px';
            self.screen.style.height = newHeight + 'px';
        }

        self.screen.style.marginTop = (-newHeight / 2) + 'px';
        self.screen.style.marginLeft = (-newWidth / 2) + 'px';

        self.canvas.width = newWidth;
        self.canvas.height = newHeight;
        self.camera.width = self.canvas.width;
        self.camera.height = self.canvas.height;
    }

    self.clear = function () {
        self.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    self.draw = function (_entities) {
        self.context.save();
        // camera rotation
        self.context.translate((self.camera.width * self.camera.anchorX), (self.camera.height * self.camera.anchorY));
        self.context.rotate(self.toRadians(-self.camera.angle));
        self.context.translate(-(self.camera.width * self.camera.anchorX), -(self.camera.height * self.camera.anchorY));
        // camera position
        self.context.translate(-self.camera.x, -self.camera.y);
        // camera zoom.
        self.context.scale(self.camera.zoom, self.camera.zoom);


        if (_entities.length > 0) {
            _entities.forEach(function (e) {
                if (e.draw) {
                    self.context.save();
                    self.context.translate(e.x + (e.width * e.anchorX), e.y + (e.height * e.anchorY));
                    self.context.rotate(self.toRadians(e.angle));
                    self.context.globalAlpha = e.opacity;

                    if (!e.image) {
                        self.context.beginPath();
                        self.context.rect(
                            e.width  * -e.anchorX,
                            e.height * -e.anchorY,
                            e.width,
                            e.height
                        );
                        self.context.fill();
                    } else {
                        self.context.drawImage(
                            e.image,
                            e.sourceX,
                            e.sourceY,
                            e.sourceWidth,
                            e.sourceHeight,
                            e.width  * -e.anchorX,
                            e.height * -e.anchorY,
                            e.width,
                            e.height
                        );
                    }
                    self.context.restore();
                }
            });
        }
        self.context.restore();
    };

    self.toRadians = function (_degrees) {
        return _degrees * 0.0174532925199432957;
    };

    self.init();

};
