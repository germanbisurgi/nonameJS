var keysState = new noname.state('keysState');

keysState.create = function () {

	console.log('keysState');

};

keysState.update = function () {

	keysState.keys.justPressed('k', function () {
		console.log('just pressed');
	});

	keysState.keys.pressing('k', function (_milliseconds) {
		console.log('pressing since', _milliseconds);
	});

	keysState.keys.released('k', function () {
		console.log('released');
	});

	keysState.keys.justPressed('b', function () {
		keysState.state.switchPrevious();
	});

	keysState.keys.justPressed('n', function () {
		keysState.state.switchNext();
	});

};
