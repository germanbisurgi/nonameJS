var game = new noname.game({
    fps: 30,
    dps: 30, // must be a factor of 60 :)
    canvas: document.querySelector('.game-canvas'),
    box2dCanvas: document.querySelector('.box2d-canvas'),
    states: [mapState, loopState],
    initialState: 'loopState'
});


window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
});

window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);
});
