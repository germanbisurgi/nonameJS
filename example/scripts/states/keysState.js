var keysState = new noname.state('keysState');


keysState.update = function () {

	if (keysState.keys.tracked.k) {
		console.log(
			keysState.keys.pressing('k'),
			keysState.keys.releasing('k'),
			keysState.keys.holding('k', 1500)
		);
	}

};
