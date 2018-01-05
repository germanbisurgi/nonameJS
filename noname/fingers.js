var Fingers = function(_game) {
    "use strict";
    var self = this;
    self.pool = [];
    self.limit = 10;

    _game.render.canvas.addEventListener('touchstart', function (event) {
        for (var i = 0; i < event.changedTouches.length; i++) {
            if (self.pool.length < self.limit) {
                self.pool.push({
                    id: event.changedTouches[i].identifier,
                    startX: event.changedTouches[i].clientX,
                    startY: event.changedTouches[i].clientY,
                    currentX: event.changedTouches[i].clientX,
                    currentY: event.changedTouches[i].clientY,
                    offsetX: 0,
                    offsetY: 0
                });
            }
        }
    }, false );

	_game.render.canvas.addEventListener('touchmove', function (event) {
        event.preventDefault();
        for (var i = 0; i < event.changedTouches.length; i++) {
            var finger = self.get(event.changedTouches[i].identifier);
            finger.currentX = event.changedTouches[i].clientX;
            finger.currentY = event.changedTouches[i].clientY;
            finger.offsetX = event.changedTouches[i].clientX - finger.startX;
            finger.offsetY = event.changedTouches[i].clientY - finger.startY;
        }
    }, false );

	_game.render.canvas.addEventListener('touchend', function (event) {
        for (var i = 0; i < event.changedTouches.length; i++) {
            var finger = self.get(event.changedTouches[i].identifier);
            self.remove(finger);
        }
    }, false );

    self.get = function(_id) {
        var output = false;
        self.pool.forEach(function (_finger) {
            if (_finger.id === _id) {
                output = _finger;
            }
        });
        return output;
    };

    self.remove = function(_item) {
        var index = self.pool.indexOf(_item);
        if (index > -1) {
            self.pool.splice(index, 1);
        }
    };

};
