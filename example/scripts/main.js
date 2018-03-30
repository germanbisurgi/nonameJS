var game = new noname.game({
	screen: document.querySelector('.screen'),
	fps: 60,
	dps: 60,
	states: [
		// timeState,
		pointersState,
		physicsState,
		keysState,
		audioState,
		entitiesState
	],
	initialState: 'entitiesState',
	physicsDebug: true
});
