var inputState = new noname.state('inputState');

inputState.preload = function () {
};

inputState.create = function () {

};

inputState.update = function () {
	if (inputState.keyboard.pressing('k', 2000)) {
		console.log('holding k');
	} else if (inputState.keyboard.pressing('k')) {
		console.log('pressed k');
	}
};
