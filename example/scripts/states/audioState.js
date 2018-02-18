var audioState = new noname.state('audioState');

audioState.preload = function () {

	audioState.assets.queueAudio('kick', 'example/assets/audio/kick.wav');

};

audioState.create = function () {

	audioState.kick = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('kick'),
		volume: 1.0
	});

};

audioState.update = function () {

	audioState.fingers.justTouched(1, function (_finger) {
		audioState.kick.play();
	});

	audioState.keys.justPressed('t', function () {
		audioState.kick.play();
	});

	audioState.keys.justPressed('b', function () {
		audioState.state.switchPrevious();
	});

	audioState.keys.justPressed('n', function () {
		audioState.state.switchNext();
	});

};
