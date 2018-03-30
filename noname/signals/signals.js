var Signals = function () {
	'use strict';
	var self = this;

	self.signals = [];

	self.on = function (_signalName, _function) {
		var signal = self.prepareSignal(_signalName);
		var subscription = {
			signal: signal.name,
			function: _function
		};
		signal.subscriptions.push(subscription);
		return subscription;
	};

	self.off = function (_subscription) {
		var signal = self.getSignal(_subscription.signal);
		if (!signal) {
			return false;
		}
		var index = signal.subscriptions.indexOf(_subscription);
		if (index > -1) {
			signal.subscriptions.splice(index, 1);
		}
	};

	self.emit = function (_signalName, _data) {
		var signal = self.prepareSignal(_signalName);
		signal.subscriptions.forEach(function (_listener) {
			_listener.function(_data);
		});
	};

	self.prepareSignal = function (_signalName) {
		var output = false;
		self.signals.forEach(function (_signal) {
			if (_signal.name === _signalName) {
				output = _signal;
			}
		});
		if (!output) {
			var signal = {
				name: _signalName,
				subscriptions: []
			};
			self.signals.push(signal);
			output = signal;
		}
		return output;
	};

	self.getSignal = function (_signalName) {
		var output = false;
		self.signals.forEach(function (_signal) {
			if (_signal.name === _signalName) {
				output = _signal;
			}
		});
		return output;
	};

};
