var Event = function (_name) {
	'use strict';
	var self = this;

	self.name = _name;
	self.listeners = [];
	self.data = null;

	self.addListener = function (_listener) {
		self.listeners.push(_listener);
		self.sortListeners();
	};

	self.removeListener = function (_listener) {
		if (self.listeners.indexOf(_listener) > -1) {
			self.listeners.splice(index, 1);
		}
		self.sortListeners();
	};

	self.sortListeners = function () {
		self.listeners.sort(function (a, b) {
			return a.priority - b.priority;
		});
	};
};
