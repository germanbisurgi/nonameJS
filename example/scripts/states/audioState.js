var audioState = new noname.state('audioState');

audioState.preload = function () {

	audioState.assets.queueAudio('tic', 'example/assets/audio/tic.mp3');

};

audioState.create = function () {

	audioState.tic = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('tic'),
		volume: 1.0
	});

};

audioState.update = function () {

	audioState.fingers.justTouched(1, function (_finger) {
		// audioState.tic.play();
	});

	audioState.keys.justPressed('t', function () {
		audioState.tic.play();
	});

	audioState.keys.justPressed('b', function () {
		audioState.state.switchPrevious();
	});

	audioState.keys.justPressed('n', function () {
		audioState.state.switchNext();
	});

};
