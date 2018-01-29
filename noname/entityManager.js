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
		});
		self.prepared = true;
	};

	self.create = function() {
		return new noname.entity();
	};

	self.add = function(_entity) {
		_entity.state = self.game.state.current.name;
		self.pool.push(_entity);
	};

	self.addImage = function(_image, _x, _y, _width, _height) {
		var entity = self.create();
		entity.addComponent(new noname.transformComponent(_x, _y, _width, _height));
		entity.addComponent(new noname.imageComponent(self.game.assets.get(_image)));
		self.pool.push(entity);
		return entity;
	};

	self.addSprite = function(_image, _x, _y, _width, _height, _tileWidth, _tileHeight) {
		var entity = self.create();
		entity.addComponent(new noname.transformComponent(_x, _y, _width, _height));
		entity.addComponent(new noname.spriteComponent(self.game.assets.get(_image), _tileWidth, _tileHeight));
		self.pool.push(entity);
		return entity;
	};

	self.addTileSprite = function(_image, _x, _y, _width, _height) {
		var entity = self.create();
		entity.addComponent(new noname.transformComponent(_x, _y, _width, _height));
		entity.addComponent(new noname.tileSpriteComponent(self.game.assets.get(_image)));
		self.pool.push(entity);
		return entity;
	};

};
