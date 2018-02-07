var eventsState = new noname.state('eventsState');

eventsState.preload = function () {};

eventsState.create = function () {
	console.log('eventsState');

	eventsState.events.on('12', function () {
		console.log('i am tired');
	});

	eventsState.events.on('12', function () {
		console.log('time to sleep');
	});

	eventsState.events.trigger('12');

};

eventsState.update = function () {
	eventsState.keys.justPressed('b', function () {
		eventsState.state.switchPrevious();
	});

	eventsState.keys.justPressed('n', function () {
		eventsState.state.switchNext();
	});
};
