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

var loading = document.querySelector('.loading');
var asset = document.querySelector('.loading-asset');
var progress = document.querySelector('.loading-progress');

game.loader.pubsub.subscribe('loading', function () {
	loading.setAttribute('style', 'display: block;');
});

game.loader.pubsub.subscribe('onload', function (_data) {
	asset.innerText = 'loading: ' + _data.name;
	progress.setAttribute('style', 'width: ' + game.loader.progress() + '%;');
});

game.loader.pubsub.subscribe('done', function () {
	asset.innerText = 'loading: DONE';
	loading.setAttribute('style', 'display: none;');
});