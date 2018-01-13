var game = new noname.game({
    screen: document.querySelector('.screen'),
    fps: 60,
    dps: 60,
    states: [myState],
    initialState: 'myState',
    box2dDebug: true
});
