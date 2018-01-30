var Entity = function (_state, _clock) {
	'use strict';
	var self = this;

	self.addComponent = function (_componentName, _component) {
		self[_componentName] = _component;
		self[_componentName].owner = self;
	};

	self.removeComponent = function (_componentName) {
		delete self[_componentName];
	};

};
