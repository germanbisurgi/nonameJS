var game = new noname.game({
	screen: document.querySelector('.screen'),
	fps: 60,
	dps: 60,
	states: [
		clocksState,
		physicsState,
		fingersState,
		keysState,
		audioState,
		eventsState,
		entitiesState
	],
	initialState: 'entitiesState',
	box2dDebug: true
});
