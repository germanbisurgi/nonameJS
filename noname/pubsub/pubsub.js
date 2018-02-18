var PubSub = function () {
	'use strict';
	var self = this;

	self.topics = [];

	self.subscribe = function (_subscriber, _topicName, _function) {
		var topic = self.openTopic(_topicName);
		var subscription = {
			subscriber: _subscriber,
			topic: topic.name,
			function: _function
		};
		topic.subscriptions.push(subscription);
		return subscription;
	};

	self.unsubscribe = function (_subscription) {
		var topic = self.searchTopic(_subscription.topic);
		if (!topic) {
			return false;
		}
		var index = topic.subscriptions.indexOf(_subscription);
		if (index > -1) {
			topic.subscriptions.splice(index, 1);
		}
	};

	self.publish = function (_topicName, _data) {
		var topic = self.openTopic(_topicName);
		topic.subscriptions.forEach(function (_listener) {
			_listener.function(_data);
		});
	};

	self.openTopic = function (_topicName) {
		var output = false;
		self.topics.forEach(function (_topic) {
			if (_topic.name === _topicName) {
				output = _topic;
			}
		});
		if (!output) {
			var topic = {
				name: _topicName,
				subscriptions: []
			};
			self.topics.push(topic);
			output = topic;
		}
		return output;
	};

	self.searchTopic = function (_topicName) {
		var output = false;
		self.topics.forEach(function (_topic) {
			if (_topic.name === _topicName) {
				output = _topic;
			}
		});
		return output;
	};

};
