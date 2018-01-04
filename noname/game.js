var Game = function (_config) {
    'use strict';
    var self = this;

    self.init = function () {

        if (typeof _config.states === 'undefined' || _config.states.length < 1) {
            console.warn('No states available');
            return;
        }

        if (typeof _config.fps !== 'undefined' && !_config.fps > 0) {
            console.warn('fps must be greater than 0');
            return;
        }

        if (typeof _config.dps !== 'undefined' && !_config.dps > 0) {
            console.warn('draw ratio must be greater than 0');
            return;
        }

        if (_config.dps > _config.fps) {
            console.warn('dps must be lower or equal to fps');
            return;
        }

        self.loop = new noname.loopManager(_config);
        self.state = new noname.stateManager(_config);
        self.math = new noname.mathManager();
        self.assets = new noname.assetManager();
        self.inputs = new noname.inputManager();
        self.clock = new noname.clockManager();
        self.entities = new noname.entityManager(self);
        self.render = new noname.renderManager(_config, self.entities.addCamera(0, 0, 0, 0));
        self.box2d = new noname.box2dManager(_config, self.render.camera);

        self.loop.start(function() {

            if (!self.state.current.initialized) {
                self.state.current.initialize(self);
            }

            if (!self.state.current.preloaded) {
                self.state.current.preloaded = true;
                self.state.current.preload();
                self.state.current.assets.loadAll();
            }

            if (self.state.current.assets.loading) {
                self.state.current.loading();
            }

            if (!self.state.current.created && self.state.current.preloaded && !self.state.current.assets.loading) {
                self.state.current.created = true;
                self.state.current.create();
            }

            if (self.state.current.created) {
                self.clock.update(self.loop.delta);
                if (true) { // TOTO physics condition
                    self.box2d.update();
                }
                self.state.current.update();
            }

            if (self.loop.frames % Math.floor(_config.fps / _config.dps) === 0) {
                // TODO performance
                var renderEntities = self.state.current.entities.pool.filter(function (_entity) {
                    return _entity.state === self.state.current.name;
                })
                self.render.resize();
                self.render.clear();
                self.render.draw(renderEntities);
                self.box2d.resize();
                self.box2d.clear();
                self.box2d.draw();


            }

        });

    }

    self.init();

};
