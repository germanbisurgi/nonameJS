var keysState = new noname.state('keysState');

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

};
