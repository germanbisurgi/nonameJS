var game = new noname.game({
    screen: document.querySelector('.screen'),
    fps: 60,
    dps: 60,
    states: [myState, devState, inputState],
    initialState: 'inputState',
    box2dDebug: true
});
