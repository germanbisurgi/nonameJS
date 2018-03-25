var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var b2Contacts = Box2D.Dynamics.Contacts;
var b2ContactListener = Box2D.Dynamics.b2ContactListener;
var b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJointDef;

var World = function (_game) {
	'use strict';
	var self = this;
	self.scale = 30;
	self.fps = _game.settings.fps;
	self.world = new b2World(new b2Vec2(0, 0), true);
	self.bodies = [];
	self.contacts = null;

	self.init = function () {
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(_game.render.context);
		debugDraw.SetDrawScale(self.scale);
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit);
		// debugDraw.AppendFlags(b2DebugDraw.e_centerOfMassBit);
		debugDraw.AppendFlags(b2DebugDraw.e_jointBit);
		self.world.SetDebugDraw(debugDraw);
		self.world.m_debugDraw.m_sprite.graphics.clear = function () {
			return false;
		};
		self.contacts = new b2ContactListener();
		self.world.SetContactListener(self.contacts);
	};

	self.createMouseJoint = function (_point, _body) {
		var point = {
			x: _point.x / self.scale,
			y: _point.y / self.scale
		};
		var jointDefinition = new Box2D.Dynamics.Joints.b2MouseJointDef();
		jointDefinition.bodyA = self.world.GetGroundBody();
		jointDefinition.bodyB = _body;
		jointDefinition.target.Set(point.x, point.y);
		jointDefinition.maxForce = 100000;
		jointDefinition.timeStep = 1 / self.fps;
		return self.world.CreateJoint(jointDefinition);
	};

	self.destroyJoint = function (_joint) {
		self.world.DestroyJoint(_joint);
	};

	self.queryPoint = function (_point, _function) {
		self.world.QueryPoint(function (fixture) {
			_function(fixture);
		},
		{x: _point.x / self.scale, y: _point.y / self.scale});
	};

	self.setGravity = function (_x, _y) {
		self.world.SetGravity(new b2Vec2(_x, _y));
	};

	/* create a body */

	self.addBody = function (_x, _y, _type) {
		var bodyDef = new b2BodyDef();
		bodyDef.position.x = _x / self.scale;
		bodyDef.position.y = _y / self.scale;
		bodyDef.active = true;
		bodyDef.allowSleep = true;
		bodyDef.angle = 0;
		bodyDef.angularDamping = 0;
		bodyDef.angularVelocity = 0;
		bodyDef.awake = true;
		bodyDef.bullet = false;
		bodyDef.fixedRotation = false;
		bodyDef.linearDamping = 0;
		bodyDef.linearVelocity = {x: 0, y: 0};
		bodyDef.userData = '';
		if (_type === 'static') {
			bodyDef.type = b2Body.b2_staticBody;
		}
		if (_type === 'dynamic') {
			bodyDef.type = b2Body.b2_dynamicBody;
		}
		if (_type === 'kinematic') {
			bodyDef.type = b2Body.b2_kinematicBody;
		}

		var body = self.world.CreateBody(bodyDef);

		// state
		body.state = _game.state.current.name;

		body.images = [];

		body.fixtures = [];

		// addCircle
		body.addCircle = function (_radius, _offsetX, _offsetY, _fixtureDefinition) {
			var fixtureDef = self.getFixtureDef(_fixtureDefinition);
			fixtureDef.shape = new b2CircleShape(_radius / self.scale);
			fixtureDef.shape.m_p = {
				x: _offsetX / self.scale || 0,
				y: _offsetY / self.scale || 0
			};
			body.fixtures.push(body.CreateFixture(fixtureDef));
		};

		// addRectangle
		body.addRectangle = function (_width, _height, _offsetX, _offsetY, _fixtureDefinition) {
			var fixtureDef = self.getFixtureDef(_fixtureDefinition);
			fixtureDef.shape = new b2PolygonShape();
			fixtureDef.shape.SetAsBox(
				_width * 0.5 / self.scale,
				_height * 0.5 / self.scale
			);
			fixtureDef.shape.m_vertices.forEach(function (_vert) {
				_vert.x += _offsetX / self.scale || 0;
				_vert.y += _offsetY / self.scale || 0;
			});
			fixtureDef.shape.m_centroid.x += _offsetX / self.scale || 0;
			fixtureDef.shape.m_centroid.y += _offsetY / self.scale || 0;
			body.fixtures.push(body.CreateFixture(fixtureDef));
		};

		// addPolygon
		body.addPolygon = function (_points, _offsetX, _offsetY, _fixtureDefinition) {
			var fixtureDef = self.getFixtureDef(_fixtureDefinition);
			fixtureDef.shape = new b2PolygonShape();
			_points.forEach(function (_point) {
				_point.x /= self.scale;
				_point.y /= self.scale;
			});
			fixtureDef.shape.SetAsArray(_points, _points.length);
			fixtureDef.shape.m_vertices.forEach(function (_vert) {
				_vert.x += _offsetX / self.scale || 0;
				_vert.y += _offsetY / self.scale || 0;
			});
			body.fixtures.push(body.CreateFixture(fixtureDef));
		};

		// addEdge
		body.addEdge = function (_x1, _y1, _x2, _y2) {
			var fixtureDef = self.getFixtureDef(_fixtureDefinition);
			fixtureDef.shape = new b2PolygonShape();
			_x1 /= self.scale;
			_y1 /= self.scale;
			_x2 /= self.scale;
			_y2 /= self.scale;
			fixtureDef.shape.SetAsEdge({x: _x1, y: _y1}, {x: _x2, y: _y2});
			body.fixtures.push(body.CreateFixture(fixtureDef));
		};

		// setVelocity
		body.setVelocity = function (_x, _y) {
			body.SetAwake(true);
			body.SetLinearVelocity({
				x: _x / self.scale,
				y: _y / self.scale
			});
		};

		// addImage
		body.addImage = function (_image, _width, _height, offsetX, offsetY) {
			body.images.push(new noname.imageComponent(
				_image,
				_width,
				_height,
				offsetX,
				offsetY
			));
		};

		self.bodies.push(body);
		return body;
	};

	self.getFixtureDef = function (_fixtureDefinition) {
		_fixtureDefinition = _fixtureDefinition || {};
		var fixDef = new b2FixtureDef();
		fixDef.density = _fixtureDefinition.density || 1;
		fixDef.friction = _fixtureDefinition.friction || 0.5;
		fixDef.isSensor = _fixtureDefinition.isSensor || false;
		fixDef.restitution = _fixtureDefinition.restitution || 0.1;
		return fixDef;
	};

	self.update = function () {
		self.world.Step(1 / self.fps, 8, 3);
		self.world.ClearForces();
	};

	self.drawDebugData = function () {
		_game.render.context.save();
		// camera rotation
		_game.render.context.translate((_game.render.camera.width * _game.render.camera.anchorX), (_game.render.camera.height * _game.render.camera.anchorY));
		_game.render.context.rotate(-_game.render.camera.angle * 0.0174532925199432957);
		_game.render.context.translate(-(_game.render.camera.width * _game.render.camera.anchorX), -(_game.render.camera.height * _game.render.camera.anchorY));
		// camera position
		_game.render.context.translate(-_game.render.camera.x, -_game.render.camera.y);
		// camera zoom.
		_game.render.context.scale(_game.render.camera.zoom, _game.render.camera.zoom);
		self.world.DrawDebugData();
		_game.render.context.restore();
	};

	self.clear = function () {
		self.bodies.forEach(function (body) {
			body.GetWorld().DestroyBody(body);
		});
		self.bodies = [];
	};

	self.init();

};
