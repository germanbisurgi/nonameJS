var audioState = new noname.state('audioState');

audioState.preload = function (game) {

	var loading = document.querySelector('.loading');
	var asset = document.querySelector('.loading-asset');
	var progress = document.querySelector('.loading-progress');

	game.loader.queueAudio('motor', 'example/assets/audio/motor.mp3');
	game.loader.queueAudio('kick', 'example/assets/audio/kick.wav');
	game.loader.queueAudio('tic', 'example/assets/audio/tic.mp3');

	game.loader.pubsub.subscribe('loading', function () {
		loading.setAttribute('style', 'display: block;');
	});

	game.loader.pubsub.subscribe('onload', function (_data) {
		asset.innerText = 'loading: ' + _data.name;
		progress.setAttribute('style', 'width: ' + game.loader.progress() + '%;');
	});

	game.loader.pubsub.subscribe('done', function () {
		asset.innerText = 'loading: DONE';
		setTimeout(function () {
			loading.setAttribute('style', 'display: none;');
		}, 1000);
	});

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

	game.fingers.justTouched(1, function () {
		audioState.motor.play();
	});

	game.fingers.justTouched(2, function () {
		audioState.tic.play();
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
