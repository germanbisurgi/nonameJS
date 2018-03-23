var keysState = new noname.state('keysState');

keysState.create = function (game) {};

keysState.update = function (game) {

	game.keys.justPressed('k', function (_key) {
		console.log('just pressed');
	});

	game.keys.pressing('k', function (_key) {
		console.log('pressing since', _key.milliseconds);
	});

	game.keys.released('k', function (_key) {
		console.log('released');
	});

	game.keys.justPressed('b', function () {
		game.state.switchPrevious();
	});

	game.keys.justPressed('n', function () {
		game.state.switchNext();
	});

};
