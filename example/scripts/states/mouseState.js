var mouseState = new noname.state('mouseState');

mouseState.create = function () {

};

mouseState.update = function () {

	mouseState.keys.justPressed('b', function () {
		mouseState.state.switchPrevious();
	});

	mouseState.keys.justPressed('n', function () {
		mouseState.state.switchNext();
	});

};
