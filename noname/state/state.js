var State = function (_name) {
	'use strict';
	var self = this;
	self.name = _name;
	self.initialized = false;
	self.preloaded = false;
	self.created = false;
	self.justEntered = true;

	self.initialize = function (_game) {
		self.initialized = true;
	};

	self.preload = function () {};

	self.loading = function () {};

	self.create = function () {};

	self.update = function () {};

	self.afterRender = function () {};

};
