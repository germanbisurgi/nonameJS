var eventsState = new noname.state('eventsState');

eventsState.preload = function () {};

eventsState.create = function () {

	// eventsState.pubsub = new noname.pubsub();

};

eventsState.update = function () {

	// logger.log(eventsState.pubsub);

	eventsState.keys.justPressed('b', function () {
		eventsState.state.switchPrevious();
	});

	eventsState.keys.justPressed('n', function () {
		eventsState.state.switchNext();
	});
};
