var State = function (_name) {
	'use strict';
	var self = this;
	self.name = _name;
	self.preloaded = false;
	self.created = false;

	self.preload = function () {};

	self.create = function () {};

	self.update = function () {};

	self.afterRender = function () {};

};
