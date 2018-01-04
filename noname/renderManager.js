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
        self.context = self.canvas.getContext("2d");
        self.screen.appendChild(self.canvas);
    }

    self.resize = function () {
        self.canvas.width = _game.settings.screen.clientWidth
        self.canvas.height = _game.settings.screen.clientHeight;
        self.camera.width = self.canvas.width;
        self.camera.height = self.canvas.height;
    };

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
