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
	self.debugDraw = null;
	self.context = _game.render.context;
	self.contacts = null;

	self.init = function () {
		self.debugDraw = new b2DebugDraw();
		self.debugDraw.SetSprite(self.context);
		self.debugDraw.SetDrawScale(self.scale);
		self.debugDraw.SetFillAlpha(0.5);
		self.debugDraw.SetFillAlpha(0.5);
		self.debugDraw.SetFlags(b2DebugDraw.e_shapeBit || b2DebugDraw.e_jointBit);
		self.world.SetDebugDraw(self.debugDraw);
		self.world.m_debugDraw.m_sprite.graphics.clear= function () {
			return false;
		};

		self.contacts = new b2ContactListener();
		self.world.SetContactListener(self.contacts);
	};

	self.calculateWorldPosition = function (_point) {
		return {
			x: _point.x / self.scale,
			y: _point.y / self.scale
		};
	};

	self.createMouseJoint = function (_point, _body) {
		var point = self.calculateWorldPosition(_point);
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
		}, self.calculateWorldPosition(_point));
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

		// addCircle
		body.addCircle = function (_radius, _offsetX, _offsetY) {
			var fixtureDef = self.getCircleFixture(_radius);
			fixtureDef.shape.m_p = {
				x: _offsetX / self.scale || 0,
				y: _offsetY / self.scale || 0
			};
			body.CreateFixture(fixtureDef);
		};

		// addRectangle
		body.addRectangle = function (_width, _height, _offsetX, _offsetY) {
			var fixtureDef = self.getRectangleFixture(_width, _height);
			fixtureDef.shape.m_vertices.forEach(function (_vert) {
				_vert.x += _offsetX / self.scale || 0;
				_vert.y += _offsetY / self.scale || 0;
			});
			fixtureDef.shape.m_centroid.x += _offsetX / self.scale || 0;
			fixtureDef.shape.m_centroid.y += _offsetY / self.scale || 0;
			body.CreateFixture(fixtureDef);
		};

		// addPolygon
		body.addPolygon = function (_points, _offsetX, _offsetY) {
			var fixtureDef = self.getPolygonFixture(_points);
			fixtureDef.shape.m_vertices.forEach(function (_vert) {
				_vert.x += _offsetX / self.scale || 0;
				_vert.y += _offsetY / self.scale || 0;
			});
			return body.CreateFixture(fixtureDef);
		};

		// addEdge
		body.addEdge = function (_x1, _y1, _x2, _y2) {
			var fixtureDef = self.getEdgeFixture(_x1, _y1, _x2, _y2);
			return body.CreateFixture(fixtureDef);
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

	/* fixtures */

	self.getFixtureDef = function () {
		var fixDef = new b2FixtureDef();
		fixDef.density = 1;
		fixDef.friction = 0.5;
		fixDef.isSensor = false;
		fixDef.restitution = 0.1;
		return fixDef;
	};

	self.getCircleFixture = function (_radius) {
		var fixDef = self.getFixtureDef();
		fixDef.shape = new b2CircleShape(_radius / self.scale);
		return fixDef;
	};

	self.getRectangleFixture = function (_width, _height) {
		var fixDef = self.getFixtureDef();
		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox(
			_width * 0.5 / self.scale,
			_height * 0.5 / self.scale
		);
		return fixDef;
	};

	self.getPolygonFixture = function (_points) {
		var fixDef = self.getFixtureDef();
		fixDef.shape = new b2PolygonShape();
		_points.forEach(function (_point) {
			_point.x /= self.scale;
			_point.y /= self.scale;
		});
		fixDef.shape.SetAsArray(_points, _points.length);
		return fixDef;
	};

	self.getEdgeFixture = function (_x1, _y1, _x2, _y2) {
		var fixDef = self.getFixtureDef();
		fixDef.shape = new b2PolygonShape();
		_x1 /= self.scale;
		_y1 /= self.scale;
		_x2 /= self.scale;
		_y2 /= self.scale;
		fixDef.shape.SetAsEdge({x: _x1, y: _y1}, {x: _x2, y: _y2});
		return fixDef;
	};

	self.update = function () {
		self.world.Step(1 / self.fps, 8, 3);
		self.world.ClearForces();
	};

	self.draw = function () {
		if (self.debugDraw) {
			self.context.save();
			// camera rotation
			self.context.translate((_game.render.camera.width * _game.render.camera.anchorX), (_game.render.camera.height * _game.render.camera.anchorY));
			self.context.rotate(self.toRadians(-_game.render.camera.angle));
			self.context.translate(-(_game.render.camera.width * _game.render.camera.anchorX), -(_game.render.camera.height * _game.render.camera.anchorY));
			// camera position
			self.context.translate(-_game.render.camera.x, -_game.render.camera.y);
			// camera zoom.
			self.context.scale(_game.render.camera.zoom, _game.render.camera.zoom);
			self.world.DrawDebugData();
			self.context.restore();
		}
	};

	self.toRadians = function (_degrees) {
		return _degrees * 0.0174532925199432957;
	};

	self.init();

};
