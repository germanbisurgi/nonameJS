var InputManager = function(_game) {
    "use strict";
    var self = this;
    self.keyboard = new noname.keyboard();

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








    window.addEventListener("gamepadconnected", function(e) {
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    });

    window.addEventListener("gamepaddisconnected", function(e) {
      console.log("Gamepad disconnected from index %d: %s",
        e.gamepad.index, e.gamepad.id);
    });


};
