var Fingers = function(_game) {
    "use strict";
    var self = this;
    self.touches = [];

    _game.render.canvas.addEventListener('touchstart', function (event) {
        self.touches = event.touches;
    }, false );

	_game.render.canvas.addEventListener('touchmove', function (event) {
        event.preventDefault();
        self.touches = event.touches;
    }, false );

	_game.render.canvas.addEventListener('touchend', function (event) {
        self.touches = event.touches;
    }, false );

};
