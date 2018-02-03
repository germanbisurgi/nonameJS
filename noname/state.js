var State = function (_name) {
	'use strict';
	var self = this;
	self.name = _name;
	self.initialized = false;
	self.preloaded = false;
	self.created = false;

	self.initialize = function (_game) {
		self.loop = _game.loop;
		self.assets = _game.assets;
		self.math = _game.math;
		self.keyboard = _game.keyboard;
		self.fingers = _game.fingers;
		self.clock = _game.clock;
		self.entities = _game.entities;
		self.render = _game.render;
		self.camera = _game.render.camera;
		self.box2d = _game.box2d;
		self.initialized = true;
	};

	self.preload = function () {};

	self.loading = function () {};

	self.create = function () {};

	self.update = function () {};

	self.afterRender = function () {};
};
