var timeState = new noname.state('timeState');

timeState.preload = function () {};

timeState.create = function () {
	console.log('timeState');
	timeState.clock.master.setInterval(function () {
		console.log('hallo');
	}, 1000)
};

timeState.update = function () {
	timeState.keys.justPressed('b', function () {
		timeState.state.switchPrevious();
	});

	timeState.keys.justPressed('n', function () {
		timeState.state.switchNext();
	});
};
