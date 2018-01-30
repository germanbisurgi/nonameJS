var Box2dComponent = function (_x, _y, _type, _state) {
	'use strict';
	var self = this;
	self.body = _state.box2d.addBody(_x, _y, _type);

	self.addCircleFixture = function (_radius, _offsetX, _offsetY) {
		var fixtureDef = _state.box2d.circle(_radius);
		fixtureDef.shape.m_p = {
			x: _offsetX / _state.box2d.scale || 0,
			y: _offsetY / _state.box2d.scale || 0
		};
		self.body.CreateFixture(fixtureDef);
	};

	self.addRectangleFixture = function () {};

	self.addPolygonFixture = function () {};

	self.followFixture = function (_entity, _fixture) {
		var body = _fixture.GetBody();
		_entity.x = (_fixture.GetAABB().GetCenter().x * 30 - _entity.width / 2);
		_entity.y = (_fixture.GetAABB().GetCenter().y * 30 - _entity.height / 2);
		_entity.angle = body.GetAngle() * 57.295779513082320876;
	};

	self.addRectangleFixture = function (_width, _height, _offsetX, _offsetY) {
		var fixtureDef = _state.box2d.rectangle(_width, _height);
		fixtureDef.shape.m_vertices.forEach(function (_vert) {
			_vert.x += _offsetX / _state.box2d.scale || 0;
			_vert.y += _offsetY / _state.box2d.scale || 0;
		});
		fixtureDef.shape.m_centroid.x += _offsetX / _state.box2d.scale || 0;
		fixtureDef.shape.m_centroid.y += _offsetY / _state.box2d.scale || 0;
		self.body.CreateFixture(fixtureDef);
	};

};
