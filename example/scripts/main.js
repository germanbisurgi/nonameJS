var game = new noname.game({
	screen: document.querySelector('.screen'),
	fps: 60,
	dps: 60,
	states: [
		timeState,
		fingersState,
		mouseState,
		physicsState,
		keysState,
		audioState,
		entitiesState
	],
	initialState: 'entitiesState',
	physicsDebug: true
});
