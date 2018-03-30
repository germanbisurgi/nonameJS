var EventEmitter = function () {
	'use strict';
	var self = this;

	self.events = [];

	self.subscribe = function (_topicName, _function) {
		var topic = self.subscribeEvent(_topicName);
		var subscription = {
			topic: topic.name,
			function: _function
		};
		topic.subscriptions.push(subscription);
		return subscription;
	};

	self.unsubscribe = function (_subscription) {
		var topic = self.getEvent(_subscription.topic);
		if (!topic) {
			return false;
		}
		var index = topic.subscriptions.indexOf(_subscription);
		if (index > -1) {
			topic.subscriptions.splice(index, 1);
		}
	};

	self.publish = function (_topicName, _data) {
		var topic = self.subscribeEvent(_topicName);
		topic.subscriptions.forEach(function (_listener) {
			_listener.function(_data);
		});
	};

	self.subscribeEvent = function (_topicName) {
		var output = false;
		self.events.forEach(function (_topic) {
			if (_topic.name === _topicName) {
				output = _topic;
			}
		});
		if (!output) {
			var topic = {
				name: _topicName,
				subscriptions: []
			};
			self.events.push(topic);
			output = topic;
		}
		return output;
	};

	self.getEvent = function (_topicName) {
		var output = false;
		self.events.forEach(function (_topic) {
			if (_topic.name === _topicName) {
				output = _topic;
			}
		});
		return output;
	};

};
