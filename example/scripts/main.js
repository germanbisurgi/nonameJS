var game = new noname.game({
    screen: document.querySelector('.screen'),
    fps: 30,
    dps: 30, // will be never greate than fps
    states: [myState],
    initialState: 'loopState'
});
