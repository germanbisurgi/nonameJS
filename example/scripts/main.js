var game = new noname.game({
	screen: document.querySelector('.screen'),
	fps: 60,
	dps: 60,
	states: [
		timeState,
		fingersState,
		physicsState,
		keysState,
		audioState,
		eventsState,
		entitiesState
	],
	initialState: 'fingersState',
	box2dDebug: true
});
