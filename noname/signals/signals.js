var Signals = function () {
	'use strict';
	var self = this;

	self.signals = [];

	self.on = function (_signalName, _function) {
		var signal = self.prepareSignal(_signalName);
		var receiver = {
			signal: signal.name,
			function: _function
		};
		signal.receivers.push(receiver);
		return receiver;
	};

	self.off = function (_receiver) {
		var signal = self.getSignal(_receiver.signal);
		if (!signal) {
			return false;
		}
		var index = signal.receivers.indexOf(_receiver);
		if (index > -1) {
			signal.receivers.splice(index, 1);
		}
	};

	self.emit = function (_signalName, _data) {
		var signal = self.prepareSignal(_signalName);
		signal.receivers.forEach(function (_listener) {
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
				receivers: []
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
