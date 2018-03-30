var physicsState = new noname.state('physicsState');

physicsState.preload = function (game) {
	game.loader.queueAudio('kick', 'example/assets/audio/kick.wav');
	game.loader.queueAudio('tic', 'example/assets/audio/tic.mp3');
};

physicsState.create = function (game) {

	// gravity
	game.world.setGravity(0, 0);

	// static edges (bench)
	physicsState.myLimits = game.world.addBody(10, 10, 'static');
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
