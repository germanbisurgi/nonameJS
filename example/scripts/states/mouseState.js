var mouseState = new noname.state('mouseState');

mouseState.create = function () {};

mouseState.update = function () {

	mouseState.mouse.justPressed(0, function (_button) {
		console.log('justPressed', _button);
	});

	mouseState.mouse.pressing(0, function (_button) {
		console.log('pressing', _button);
	});

	mouseState.mouse.released(0, function (_button) {
		console.log('released', _button);
	});

	mouseState.keys.justPressed('b', function () {
		mouseState.state.switchPrevious();
	});

	mouseState.keys.justPressed('n', function () {
		mouseState.state.switchNext();
	});

};
