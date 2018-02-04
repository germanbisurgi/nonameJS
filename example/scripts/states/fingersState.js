var fingersState = new noname.state('fingersState');

fingersState.preload = function () {};

fingersState.create = function () {
	console.log('fingerState');
};

fingersState.update = function () {

	fingersState.fingers.tracked.forEach(function (finger) {
		console.log(finger);
	});

	fingersState.keys.justPressed('b', function () {
		fingersState.state.switchPrevious();
	});

	fingersState.keys.justPressed('n', function () {
		fingersState.state.switchNext();
	});
};
