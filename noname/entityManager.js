var EntityManager = function (_game) {
    'use strict';
    var self = this;
    self.game = _game;
    self.pool = [];
    self.active = [];
    self.prepared = false;

    self.prepare = function() {
        self.active = self.pool.filter(function (_entity) {
            return _entity.state === self.game.state.current.name;
        })
        self.prepared = true;
    };

    self.create = function() {
        var entity = new noname.entity(self.game.state.current.name, self.game.clock.master);
        return entity;
    };

    self.add = function(_entity) {
        self.pool.push(_entity);
    };

    self.addImage = function(_image, _x, _y, _width, _height) {
        var entity = self.create();
        entity.addComponent(new noname.matrixComponent(_x, _y, _width, _height));
        entity.addComponent(new noname.imageComponent(self.game.assets.get(_image)));
        self.pool.push(entity);
        return entity;
    };

    self.addSprite = function(_image, _x, _y, _width, _height, _tileWidth, _tileHeight) {
        var entity = self.create();
        entity.addComponent(new noname.matrixComponent(_x, _y, _width, _height));
        entity.addComponent(new noname.spriteComponent(self.game.assets.get(_image), _tileWidth, _tileHeight));
        self.pool.push(entity);
        return entity;
    };

    self.addTileSprite = function(_image, _x, _y, _width, _height) {
        var entity = self.create();
        entity.addComponent(new noname.matrixComponent(_x, _y, _width, _height));
        entity.addComponent(new noname.tileSpriteComponent(self.game.assets.get(_image)));
        self.pool.push(entity);
        return entity;
    };

    self.addCamera = function(_x, _y, _width, _height) {
        var entity = self.create();
        entity.addComponent(new noname.cameraComponent(_x, _y, _width, _height));
        return entity;
    };

    self.list = function() {
        return self.pool;
    };

};
