var loggerContainer = document.querySelector('.logger');
var logger = new Logger(loggerContainer);

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
		entitiesState
	],
	initialState: 'audioState',
	box2dDebug: false
});
