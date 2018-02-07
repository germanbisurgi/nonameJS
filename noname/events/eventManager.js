var EventManager = function () {
	'use strict';
	var self = this;

	self.events = [];
	self.triggered = [];

	self.update = function () {
		if (self.triggered.length > 0) {
			self.triggered.forEach(function (_event) {
				_event.listeners.forEach(function (_listener) {
					_listener.function(_event.data);
				});
			});
			self.triggered = [];
		}
	};

	self.on = function (_eventName, _function, _priority) {
		var event = self.get(_eventName);
		var listener = new noname.eventListener(_function, _priority);
		if (!event) {
			event = new noname.event(_eventName);
			self.events.push(event);
		}
		event.addListener(listener);
		return true;
	};

	self.trigger = function (_eventName, _data) {
		var event = self.get(_eventName);
		if (!event) {
			return false;
		}
		if (_data) {
			event.data = _data;
		}
		self.triggered.push(event);
		return true;
	};

	self.off = function (_eventName, _listener) {
		var event = self.get(_eventName);
		if (!event) {
			return false;
		}
		event.removeListener(_listener);

		if (event.listeners.length === 0) {
			self.remove(_eventName);
		}
	};

	self.remove = function (_eventName) {
		var event = self.get(_eventName);
		if (!event) {
			return false;
		}
		var index = self.events.indexOf(event);
		if (index > -1) {
			self.events.splice(index, 1);
		}
	};

	self.get = function (_eventName) {
		if (self.events.length === 0) {
			return false;
		}
		var output = false;
		self.events.forEach(function (_event) {
			if (_event.name === _eventName) {
				output = _event;
			}
		});
		return output;
	};

};
