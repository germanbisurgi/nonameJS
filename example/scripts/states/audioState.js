var audioState = new noname.state('audioState');

audioState.preload = function () {

	var loading = document.querySelector('.loading');

	audioState.assets.queueAudio('kick', 'example/assets/audio/kick.wav');
	audioState.assets.queueAudio('tic', 'example/assets/audio/tic.mp3');
	audioState.assets.queueAudio('motor', 'example/assets/audio/motor.mp3');

	audioState.assets.pubsub.subscribe('audioState', 'onload', function (_data) {
		console.log(_data.name);
		loading.innerText = 'loading: ' + _data.name;
	});

	audioState.assets.pubsub.subscribe('audioState', 'onerror', function (_data) {
		console.log(_data.name);
	});

	audioState.assets.pubsub.subscribe('audioState', 'done', function () {
		console.log('done');
		loading.innerText = 'loading: DONE';
	});

};

audioState.create = function () {

	audioState.kick = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('kick'),
		volume: 1.0
	});

	audioState.motor = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('motor'),
		volume: 1.0
	});

	audioState.tic = audioState.audio.createTrack({
		audioBuffer: audioState.assets.get('tic'),
		volume: 0.5
	});

};

audioState.update = function () {

	audioState.fingers.justTouched(1, function (_finger) {
		audioState.motor.play();
	});

	audioState.fingers.justTouched(2, function (_finger) {
		audioState.tic.play();
	});

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
