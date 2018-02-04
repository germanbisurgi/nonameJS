var game = new noname.game({
    screen: document.querySelector('.screen'),
    fps: 60,
    dps: 60,
    states: [myState, devState, keysState, clocksState],
    initialState: 'clocksState',
    box2dDebug: true
});
