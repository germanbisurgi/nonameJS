var audioState = new noname.state('audioState');

audioState.preload = function () {
	audioState.assets.queueAudio('tic', 'example/assets/audio/tic.mp3');
	audioState.assets.queueAudio('motor', 'example/assets/audio/motor.mp3');
	audioState.assets.queueAudio('psycho', 'example/assets/audio/psycho.wav');
	audioState.assets.queueAudio('kick', 'example/assets/audio/kick.wav');
	audioState.assets.queueAudio('snare', 'example/assets/audio/snare.wav');
};

audioState.create = function () {

	audioState.kick = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('kick')
	});

	audioState.snare = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('snare'),
		volume: 0.3
	});

	audioState.psycho = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('psycho')
	});

};

audioState.update = function () {

	audioState.keys.justPressed('t', function () {
		audioState.kick.stop();
		audioState.kick.play();
	});

	audioState.keys.justPressed('e', function () {
		audioState.snare.stop();
		audioState.snare.play();
	});

	audioState.keys.justPressed('p', function () {
		audioState.psycho.play();
	});

	audioState.keys.justPressed('s', function () {
		audioState.psycho.pause();
	});

	audioState.keys.justPressed('a', function () {
		audioState.psycho.stop();
	});

	audioState.keys.justPressed('b', function () {
		audioState.state.switchPrevious();
	});

	audioState.keys.justPressed('n', function () {
		audioState.state.switchNext();
	});
};
