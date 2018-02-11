var keysState = new noname.state('keysState');

keysState.create = function () {

};

keysState.update = function () {

	keysState.keys.justPressed('k', function (_key) {
		console.log('just pressed');
	});

	keysState.keys.pressing('k', function (_key) {
		console.log('pressing since', _key.milliseconds);
	});

	keysState.keys.released('k', function (_key) {
		console.log('released');
	});

	keysState.keys.justPressed('b', function () {
		keysState.state.switchPrevious();
	});

	keysState.keys.justPressed('n', function () {
		keysState.state.switchNext();
	});

};
