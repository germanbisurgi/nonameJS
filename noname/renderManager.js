var RenderManager = function (_canvas, _clock) {
    'use strict';
    var self = this;
    self.canvas = _canvas;
    self.context = self.canvas.getContext("2d");
    self.x = 0;
    self.y = 0;
    self.anchorX = 0.5;
    self.anchorY =  0.5;
    self.angle = 0;
    self.clock = _clock;
    self.zoom = 1.0;
    self.lerp = 0.1;

    self.clear = function () {
        self.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    self.draw = function (_entities) {
        self.context.save();
        // camera rotation
        self.context.translate((self.canvas.width * self.anchorX), (self.canvas.height * self.anchorY));
        self.context.rotate(self.toRadians(-self.angle));
        self.context.translate(-(self.canvas.width * self.anchorX), -(self.canvas.height * self.anchorY));
        // camera position
        self.context.translate(-self.x, -self.y);
        // camera zoom.
        self.context.scale(self.zoom, self.zoom);


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

        // camera transforms.
        self.context.restore();

    };

    self.toRadians = function (_degrees) {
        return _degrees * 0.0174532925199432957;
    };

    self.follow = function (_x, _y, _w, _h) {
        var destinationX = self.zoom * (_x + _w  / 2) - (self.canvas.width  / 2);
        var destinationY = self.zoom * (_y + _h / 2) - (self.canvas.height / 2);
        self.x += (destinationX - self.x) * self.lerp;
        self.y += (destinationY - self.y) * self.lerp;
    }

    self.move = function (_x, _y) {
        self.x += self.clock.toPPS(_x);
        self.y += self.clock.toPPS(_y);
    }
    self.setPosition = function (_x, _y) {
        self.x = _x;
        self.y = _y;
    }
    self.setZoom = function (_zoom) {
        self.zoom += self.clock.toPPS(_zoom);
    }
    self.setLerp = function (_lerp) {
        self.lerp = _lerp;
    }
    self.setSize = function (_w, _h) {
        self.width = _w;
        self.height = _h;
    }
    self.rotate = function (_degrees) {
        self.angle += self.clock.toDPS(_degrees);
    }
    self.setAngle = function (_degrees) {
        self.angle = _degrees;
    }


};
