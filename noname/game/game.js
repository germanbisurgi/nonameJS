var Game = function (_settings) {
	'use strict';
	var self = this;
	self.settings = _settings;

	self.init = function () {

		if (typeof _settings.states === 'undefined' || _settings.states.length < 1) {
			console.warn('No states available');
			return;
		}

		if (typeof _settings.fps !== 'undefined' && !_settings.fps > 0) {
			console.warn('fps must be greater than 0');
			return;
		}

		if (typeof _settings.dps !== 'undefined' && !_settings.dps > 0) {
			console.warn('draw ratio must be greater than 0');
			return;
		}

		if (_settings.dps > _settings.fps) {
			console.warn('dps must be lower or equal to fps');
			return;
		}

		self.loop = new noname.loop(self);
		self.state = new noname.stateManager(self);
		self.mathematics = new noname.mathematics();
		self.loader = new noname.loader();
		self.time = new noname.time(self);
		self.entities = new noname.entityManager(self);
		self.render = new noname.render(self);
		self.physics = new noname.physics(self);
		self.keys = new noname.keys(self);
		self.fingers = new noname.fingers(self);
		self.mouse = new noname.mouse(self);
		self.audio = new noname.audio(self);

		self.loop.start(function () {

			self.state.actualSwitch();

			if (!self.state.current.initialized) {
				self.state.current.initialize(self);
			}

			if (!self.state.current.preloaded) {
				self.state.current.preloaded = true;
				self.state.current.preload(self);
				self.loader.loadAll();
			}

			if (self.loader.loading) {
				self.state.current.loading();
			}

			if (!self.state.current.created && self.state.current.preloaded && !self.loader.loading) {
				self.state.current.created = true;
				self.state.current.create(self);
			}

			if (self.state.current.created) {

				if (self.state.current.justEntered) {
					self.state.current.justEntered = false;
					self.entities.prepare();
				}

				// todo systems pattern?
				self.time.update(self.loop.delta);
				self.keys.update();
				self.fingers.update();
				self.mouse.update();
				self.physics.update(); // TODO physics condition.
				self.state.current.update(self);

				if (self.loop.frames % Math.floor(_settings.fps / _settings.dps) === 0) {

					self.render.clear();
					self.render.draw(self.entities.active);

					if (_settings.physicsDebug) {
						self.physics.clear();
						self.physics.draw();
					}

					self.state.current.afterRender(self);

				}
			}

		});

	};

	self.init();

};
