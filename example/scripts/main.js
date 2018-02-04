var game = new noname.game({
	screen: document.querySelector('.screen'),
	fps: 60,
	dps: 60,
	states: [
		clocksState,
		physicsState,
		fingersState,
		keysState
	],
	initialState: 'fingersState',
	box2dDebug: true
});
