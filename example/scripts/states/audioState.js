var audioState = new noname.state('audioState');

audioState.preload = function () {
	audioState.assets.queueAudio('tic', 'example/assets/audio/tic.mp3');
};

audioState.create = function () {
	console.log('audioState');
	var audioBuffer = audioState.assets.get('tic');
	audioState.audio.play(audioBuffer, 0);
};

audioState.update = function () {
	audioState.keys.justPressed('b', function () {
		audioState.state.switchPrevious();
	});

	audioState.keys.justPressed('n', function () {
		audioState.state.switchNext();
	});
};
