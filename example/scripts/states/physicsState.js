var physicsState = new noname.state('physicsState');

physicsState.preload = function (game) {

	var loading = document.querySelector('.loading');
	var asset = document.querySelector('.loading-asset');
	var progress = document.querySelector('.loading-progress');

	game.loader.queueAudio('kick', 'example/assets/audio/kick.wav');
	game.loader.queueAudio('tic', 'example/assets/audio/tic.mp3');

	game.loader.pubsub.subscribe('loading', function () {
		loading.setAttribute('style', 'display: block;');
	});

	game.loader.pubsub.subscribe('onload', function (_data) {
		asset.innerText = 'loading: ' + _data.name;
		progress.setAttribute('style', 'width: ' + game.loader.progress() + '%;');
	});

	game.loader.pubsub.subscribe('done', function () {
		asset.innerText = 'loading: DONE';
		setTimeout(function () {
			loading.setAttribute('style', 'display: none;');
		}, 1000);
	});
};

physicsState.create = function (game) {

	// gravity
	game.physics.setGravity(0, 0);

	// static edges (bench)
	physicsState.myLimits = game.physics.addBody(10, 10, 'static');
	physicsState.myLimits.addEdge(0, 0, window.innerWidth - 20, 0);
	physicsState.myLimits.addEdge(window.innerWidth - 20, 0, window.innerWidth - 20, window.innerHeight -20);
	physicsState.myLimits.addEdge(window.innerWidth - 20, window.innerHeight - 20, 0, window.innerHeight - 20);
	physicsState.myLimits.addEdge(0, window.innerHeight - 20, 0, 0);

};

physicsState.update = function (game) {

	game.keys.justPressed('b', function () {
		game.state.switchPrevious();
	});

	game.keys.justPressed('n', function () {
		game.state.switchNext();
	});
};
