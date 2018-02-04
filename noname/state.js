var State = function (_name) {
	'use strict';
	var self = this;
	self.name = _name;
	self.initialized = false;
	self.preloaded = false;
	self.created = false;
	self.justEntered = true;

	self.initialize = function (_game) {
		self.loop = _game.loop;
		self.assets = _game.assets;
		self.math = _game.math;
		self.keys = _game.keys;
		self.fingers = _game.fingers;
		self.clock = _game.clock;
		self.entities = _game.entities;
		self.render = _game.render;
		self.camera = _game.render.camera;
		self.box2d = _game.box2d;
		self.state = _game.state;
		self.initialized = true;
	};

	self.enter = function () {
		console.log('enter', self.name);
	};

	self.preload = function () {};

	self.loading = function () {};

	self.create = function () {};

	self.update = function () {};

	self.afterRender = function () {};

	self.exit = function () {
		console.log('exit', self.name);
	};
};
