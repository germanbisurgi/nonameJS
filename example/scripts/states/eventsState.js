var eventsState = new noname.state('eventsState');
var pubsub = new noname.pubsub();


eventsState.preload = function () {};

eventsState.create = function () {


	var subscription = pubsub.subscribe('alfonso', 'mySignal', function (_data) {
		console.log(_data)
	});

	pubsub.subscribe('gennaro', 'mySignal', function (_data) {
		console.log(_data)
	});

	pubsub.public('mySignal', {data: 'banana'});

	pubsub.unsubscribe(subscription);

};

eventsState.update = function () {

	logger.log(pubsub)

	eventsState.keys.justPressed('b', function () {
		eventsState.state.switchPrevious();
	});

	eventsState.keys.justPressed('n', function () {
		eventsState.state.switchNext();
	});
};
