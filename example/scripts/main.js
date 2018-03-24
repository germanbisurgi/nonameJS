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

var myLogger = new Logger(document.querySelector('.logger'));
var loggerElement = document.querySelector('.logger');
var loggerDeeper = document.querySelector('.logger-deeper');
var loggerShallower = document.querySelector('.logger-shallower');
var loggerRange = document.querySelector('.logger-range');
loggerDeeper.onmousedown = function (_event) {
	_event.preventDefault();
	myLogger.goDeeper();
};
loggerShallower.onmousedown = function (_event) {
	_event.preventDefault();
	myLogger.goShallower();
};
loggerDeeper.ontouchstart = function (_event) {
	_event.preventDefault();
	myLogger.goDeeper();
};
loggerShallower.ontouchstart = function (_event) {
	_event.preventDefault();
	myLogger.goShallower();
};
loggerRange.oninput = function (_event) {
	loggerElement.scrollTop = Math.floor((loggerElement.scrollHeight - window.innerHeight) * _event.target.value);
};
