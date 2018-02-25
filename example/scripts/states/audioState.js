var audioState = new noname.state('audioState');

audioState.preload = function () {

	var loading = document.querySelector('.loading');
	var asset = document.querySelector('.loading-asset');
	var progress = document.querySelector('.loading-progress');

	audioState.assets.queueAudio('motor', 'example/assets/audio/motor.mp3');
	audioState.assets.queueAudio('kick', 'example/assets/audio/kick.wav');
	audioState.assets.queueAudio('tic', 'example/assets/audio/tic.mp3');

	audioState.assets.pubsub.subscribe('loading', function () {
		console.log('loading');
		loading.setAttribute('style', 'display: block;');
	});

	var subscription = audioState.assets.pubsub.subscribe('onload', function (_data) {
		asset.innerText = 'loading: ' + _data.name;
		progress.setAttribute('style', 'width: ' + audioState.assets.progress()  + '%;');
	});

	audioState.assets.pubsub.subscribe('done', function () {
		asset.innerText = 'loading: DONE';
		setTimeout(function () {
			loading.setAttribute('style', 'display: none;');
		}, 1000);
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

	logger.log(audioState.assets.pubsub);

	audioState.fingers.justTouched(1, function () {
		audioState.motor.play();
	});

	audioState.fingers.justTouched(2, function () {
		audioState.tic.play();
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
