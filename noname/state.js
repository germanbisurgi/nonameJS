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
        self.inputs = _game.inputs;
        self.clock = _game.clock;
        self.entities = _game.entities;
        self.render = _game.render;
        self.camera = _game.render.camera;
        self.box2d = _game.box2d;
        self.initialized = true;
    }

    self.preload = function () {}

    self.loading = function () {}

    self.create = function () {}

    self.update = function () {}

};

































    /*
    self.initialized = false;
    self.preloaded = false;
    self.created = false;
    self.game = null;
    self.loop = null;
    self.assets = null;
    self.inputs = null;
    self.screen = null;
    self.renderer = null;

    self.init = function () {
        self.physics = new Bamboo.physics();
        self.time = new Bamboo.timeManager(self.game);
        self.entities = new Bamboo.entityManager(self.game);
        self.cameras = new Bamboo.cameraManager(self.screen);
        self.events = new Bamboo.events();
        self.initialized = true;
    };


    self.beforePreload = function () {};

    self.preload = function () {};

    self.loading = function () {};

    self.beforeCreate = function () {};

    self.create = function () {};

    self.afterCreate = function () {};

    self.update = function () {};

    self.postRender = function () {};

    self.shutdown = function () {};*/
