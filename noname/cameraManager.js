var CameraManager = function (pScreen) {
    "use strict";
    var self = this;

    self.current = null;
    self.pool = [];

    self.init = function () {
        self.add('main');
        self.switch('main');
    }

    self.get = function(pCameraName) {
        var output = false;
        self.pool.forEach(function(pCamera) {
            if (pCamera.name === pCameraName) {
                output = pCamera;
            }
        });
        return output;
    };

    self.list = function () {
        return self.pool;
    };

    self.add = function(pCameraName) {
        var camera = new Bamboo.camera(pCameraName, pScreen);
        self.pool.push(camera);
    };

    self.switch = function(pCameraName) {
        var requestedCamera = self.get(pCameraName);
        if (requestedCamera) {
            self.current = requestedCamera;
        }
    };

    self.init();

};