var Messages = function () {
	'use strict';
	var self = this;

	self.messages = [];

	self.on = function (_messageName, _function) {
		var message = self.prepareMessage(_messageName);
		var receiver = {
			message: message.name,
			function: _function
		};
		message.receivers.push(receiver);
		return receiver;
	};

	self.off = function (_receiver) {
		var message = self.getMessage(_receiver.message);
		if (!message) {
			return false;
		}
		var index = message.receivers.indexOf(_receiver);
		if (index > -1) {
			message.receivers.splice(index, 1);
		}
	};

	self.send = function (_messageName, _data) {
		var message = self.prepareMessage(_messageName);
		message.receivers.forEach(function (_listener) {
			_listener.function(_data);
		});
	};

	self.prepareMessage = function (_messageName) {
		var output = false;
		self.messages.forEach(function (_message) {
			if (_message.name === _messageName) {
				output = _message;
			}
		});
		if (!output) {
			var message = {
				name: _messageName,
				receivers: []
			};
			self.messages.push(message);
			output = message;
		}
		return output;
	};

	self.getMessage = function (_messageName) {
		var output = false;
		self.messages.forEach(function (_message) {
			if (_message.name === _messageName) {
				output = _message;
			}
		});
		return output;
	};

};
