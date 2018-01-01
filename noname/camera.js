var Camera = function (pName, pScreen) {
    "use strict";
    var self = this;

    self.name = pName;
    self.x = 0;
    self.y = 0;
    self.width = pScreen.width;
    self.height = pScreen.height;
    self.anchorX = 0.5;
    self.anchorY =  0.5;
    self.angle = 0;
    self.zoom = 1.0;
    self.lerp = 1;

    self.follow = function (pEntity) {
        if (self.lerp < 1) { self.lerp = 1;}
        var destinationX = self.zoom * (pEntity.x + pEntity.width  / 2) - (self.width  / 2);
        var destinationY = self.zoom * (pEntity.y + pEntity.height / 2) - (self.height / 2);
        self.x += (destinationX - self.x) / self.lerp;
        self.y += (destinationY - self.y) / self.lerp;
    }
};
