var audioState = new noname.state('audioState');

audioState.preload = function () {
	audioState.assets.queueAudio('tic', 'example/assets/audio/tic.mp3');
	audioState.assets.queueAudio('motor', 'example/assets/audio/motor.mp3');
	audioState.assets.queueAudio('psycho', 'example/assets/audio/psycho.wav');
};

audioState.create = function () {

	audioState.tic = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('tic')
	});

	audioState.psycho = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('psycho'),
		volume: 0.3
	});

	audioState.psycho.seek(30);

};

audioState.update = function () {

	audioState.keys.justPressed('t', function () {
		audioState.tic.play();
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

	console.log(audioState.psycho.playbackTime);

	audioState.keys.justPressed('b', function () {
		audioState.state.switchPrevious();
	});

	audioState.keys.justPressed('n', function () {
		audioState.state.switchNext();
	});
};
