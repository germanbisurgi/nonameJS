var audioState = new noname.state('audioState');

audioState.preload = function () {

	audioState.assets.queueAudio('kick', 'example/assets/audio/kick.wav');
	audioState.assets.queueAudio('tic', 'example/assets/audio/tic.mp3');
	audioState.assets.queueAudio('snare', 'example/assets/audio/snare.wav');

	document.body.onclick = function () {
		audioState.tic.play();
	}

};

audioState.create = function () {

	audioState.kick = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('kick'),
		volume: 1.0
	});

	audioState.snare = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('snare'),
		volume: 1.0
	});

	audioState.tic = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('tic'),
		volume: 0.5
	});

};

audioState.update = function () {

	logger.log(audioState.tic, audioState.kick);

	/*audioState.fingers.justTouched(1, function (_finger) {
		audioState.tic.play();
	});

	audioState.fingers.justTouched(2, function (_finger) {
		audioState.kick.play();
	});*/

	audioState.keys.justPressed('t', function () {
		audioState.kick.play();
	});

	audioState.keys.justPressed('e', function () {
		audioState.snare.play();
	});

	audioState.keys.justPressed('b', function () {
		audioState.state.switchPrevious();
	});

	audioState.keys.justPressed('n', function () {
		audioState.state.switchNext();
	});

};
