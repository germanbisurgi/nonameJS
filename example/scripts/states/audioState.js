var audioState = new noname.state('audioState');

audioState.preload = function (game) {
	game.loader.queueAudio('motor', 'example/assets/audio/motor.mp3');
	game.loader.queueAudio('kick', 'example/assets/audio/kick.wav');
	game.loader.queueAudio('tic', 'example/assets/audio/tic.mp3');
};

audioState.create = function (game) {

	audioState.kick = game.audio.createTrack({
		audioBuffer: game.loader.get('kick'),
		volume: 1.0
	});

	audioState.motor = game.audio.createTrack({
		audioBuffer: game.loader.get('motor'),
		volume: 1.0
	});

	audioState.tic = game.audio.createTrack({
		audioBuffer: game.loader.get('tic'),
		volume: 0.5
	});

};

audioState.update = function (game) {

	game.pointers.onStart(function (pointers) {
		pointers.forEach(function (pointer) {
			if (pointer.number === 0) {
				audioState.kick.play();
			}
		})
	});

	game.pointers.onStart(function (pointers) {
		pointers.forEach(function (pointer) {
			if (pointer.number === 2) {
				audioState.tic.play();
			}
		})
	});

	game.keys.justPressed('t', function () {
		audioState.kick.play();
	});

	game.keys.justPressed('b', function () {
		game.state.switchPrevious();
	});

	game.keys.justPressed('n', function () {
		game.state.switchNext();
	});

};
