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
	self.scale = 90;
	self.fps = _game.settings.fps;
	self.world = new b2World(new b2Vec2(0, 0), true);
	self.bodies = [];
	self.contacts = null;
	self.mouseJoints = [];

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

	self.createDistanceJoint = function (_config) {
		var ax = _config.ax || _config.ax === 0 ? _config.ax / self.scale : 0;
		var ay = _config.ay || _config.ay === 0 ? _config.ay / self.scale : 0;
		var bx = _config.bx || _config.bx === 0 ? _config.bx / self.scale : 0;
		var by = _config.by || _config.by === 0 ? _config.by / self.scale : 0;
		var jointDefinition = new Box2D.Dynamics.Joints.b2DistanceJointDef();
		jointDefinition.Initialize(
			_config.bodyA,
			_config.bodyB,
			{x: _config.bodyA.GetWorldCenter().x + (ax), y: _config.bodyA.GetWorldCenter().y + (ay)},
			{x: _config.bodyB.GetWorldCenter().x + (bx), y: _config.bodyB.GetWorldCenter().y + (by)}
		);
		jointDefinition.length = _config.length || _config.length === 0 ? _config.length / self.scale : jointDefinition.length;
		jointDefinition.frequencyHz = _config.frequencyHz || _config.frequencyHz === 0 ? _config.frequencyHz : jointDefinition.frequencyHz;
		jointDefinition.damping = _config.damping || _config.damping === 0 ? _config.damping : jointDefinition.damping;
		jointDefinition.collideConnected = _config.collideConnected  ? _config.collideConnected : jointDefinition.collideConnected;
		return self.world.CreateJoint(jointDefinition);
	};

	self.createRevoluteJoint = function (_config) {
		var jointDefinition = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
		jointDefinition.Initialize(
			_config.bodyA,
			_config.bodyB,
			_config.bodyA.GetWorldCenter()
		);
		var ax = _config.ax || _config.ax === 0 ? _config.ax / self.scale : 0;
		var ay = _config.ay || _config.ay === 0 ? _config.ay / self.scale : 0;
		var bx = _config.bx || _config.bx === 0 ? _config.bx / self.scale : 0;
		var by = _config.by || _config.by === 0 ? _config.by / self.scale : 0;
		jointDefinition.localAnchorA = {x: ax, y: ay};
		jointDefinition.localAnchorB = {x: bx, y: by};
		jointDefinition.motorSpeed = _config.motorSpeed || _config.motorSpeed === 0 ? _config.motorSpeed * 0.0174532925199432957 : 0;
		jointDefinition.lowerAngle = _config.lowerAngle || _config.lowerAngle === 0 ? _config.lowerAngle * 0.0174532925199432957 : 0;
		jointDefinition.upperAngle = _config.upperAngle || _config.upperAngle === 0 ? _config.upperAngle * 0.0174532925199432957 : 0;
		jointDefinition.maxMotorTorque = _config.maxMotorTorque || _config.maxMotorTorque === 0 ? _config.maxMotorTorque : 0;
		jointDefinition.enableMotor = _config.enableMotor  ? _config.enableMotor : false;
		jointDefinition.enableLimit = _config.enableLimit  ? _config.enableLimit : false;
		jointDefinition.collideConnected = _config.collideConnected  ? _config.collideConnected : false;
		return self.world.CreateJoint(jointDefinition);
	};

self.createPrismaticJoint = function (_config) {
		var axisX = _config.axisX || _config.axisX === 0  ? _config.axisX / self.scale : 0;
		var axisY = _config.axisY || _config.axisY === 0 ? _config.axisY / self.scale : 0;
		var jointDefinition = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
		jointDefinition.Initialize(
			_config.bodyA,
			_config.bodyB,
			_config.bodyA.GetWorldCenter(),
			{x: axisX, y: axisY}
		);
		var ax = _config.ax || _config.ax === 0 ? _config.ax / self.scale : 0;
		var ay = _config.ay || _config.ay === 0 ? _config.ay / self.scale : 0;
		var bx = _config.bx || _config.bx === 0 ? _config.bx / self.scale : 0;
		var by = _config.by || _config.by === 0 ? _config.by / self.scale : 0;
		jointDefinition.localAnchorA = {x: ax, y: ay};
		jointDefinition.localAnchorB = {x: bx, y: by};
		jointDefinition.lowerTranslation = _config.lowerTranslation || _config.lowerTranslation === 0 ? _config.lowerTranslation / self.scale : 0;
		jointDefinition.upperTranslation = _config.upperTranslation || _config.upperTranslation === 0 ? _config.upperTranslation / self.scale : 0;
		jointDefinition.enableLimit = _config.enableLimit  ? _config.enableLimit : false;
		jointDefinition.motorSpeed = _config.motorSpeed || _config.motorSpeed === 0 ? _config.motorSpeed * 0.0174532925199432957 : 0;
		jointDefinition.maxMotorForce = _config.maxMotorForce || _config.maxMotorForce === 0 ? _config.maxMotorForce : 0;
		jointDefinition.enableMotor = _config.enableMotor  ? _config.enableMotor : false;
		jointDefinition.collideConnected = _config.collideConnected  ? _config.collideConnected : false;
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

	self.rayCast = function (_pointA, _pointB, _callback) {
		self.world.RayCast(
			_callback,
			{x: _pointA.x / self.scale, y: _pointA.y / self.scale},
			{x: _pointB.x / self.scale, y: _pointB.y / self.scale}
		);
	};

	self.setGravity = function (_x, _y) {
		self.world.SetGravity(new b2Vec2(_x, _y));
	};

	/* create a body */

	self.addBody = function (_x, _y, _type, _bodyDefinition) {
		_bodyDefinition = _bodyDefinition || {};
		var bodyDef = new b2BodyDef();
		bodyDef.position.x = _x / self.scale;
		bodyDef.position.y = _y / self.scale;
		bodyDef.active = _bodyDefinition.active ? _bodyDefinition.active : true;
		bodyDef.allowSleep = _bodyDefinition.allowSleep ? _bodyDefinition.allowSleep : true;
		bodyDef.awake = _bodyDefinition.awake ? _bodyDefinition.awake : true;
		bodyDef.bullet = _bodyDefinition.bullet ? _bodyDefinition.bullet : false;
		bodyDef.fixedRotation = _bodyDefinition.fixedRotation ? _bodyDefinition.fixedRotation : false;
		bodyDef.angle = _bodyDefinition.angle || _bodyDefinition.angle === 0 ? _bodyDefinition.angle : 0;
		bodyDef.angularDamping = _bodyDefinition.angularDamping || _bodyDefinition.angularDamping === 0 ? _bodyDefinition.angularDamping : 0;
		bodyDef.angularVelocity = _bodyDefinition.angularVelocity || _bodyDefinition.angularVelocity === 0 ? _bodyDefinition.angularVelocity : 0;
		bodyDef.linearDamping = _bodyDefinition.linearDamping || _bodyDefinition.linearDamping === 0 ? _bodyDefinition.linearDamping : 0;
		bodyDef.linearVelocity = _bodyDefinition.linearVelocity ? _bodyDefinition.linearVelocity : {x: 0, y: 0};
		bodyDef.userData = _bodyDefinition.userData ? _bodyDefinition.userData : '';
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
		body.addCircle = function (_offsetX, _offsetY, _radius, _fixtureDefinition) {
			var fixtureDef = self.getFixtureDef(_fixtureDefinition);
			fixtureDef.shape = new b2CircleShape(_radius / self.scale);
			fixtureDef.shape.m_p = {
				x: _offsetX / self.scale || 0,
				y: _offsetY / self.scale || 0
			};
			var fixture = body.CreateFixture(fixtureDef);
			body.fixtures.push(fixture);
			return fixture;
		};

		// addRectangle
		body.addRectangle = function (_offsetX, _offsetY, _width, _height, _fixtureDefinition) {
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
			var fixture = body.CreateFixture(fixtureDef);
			body.fixtures.push(fixture);
			return fixture;
		};

		// addPolygon
		body.addPolygon = function (_offsetX, _offsetY, _points, _fixtureDefinition) {
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
			var fixture = body.CreateFixture(fixtureDef);
			body.fixtures.push(fixture);
			return fixture;
		};

		// addEdge
		body.addEdge = function (_x1, _y1, _x2, _y2, _fixtureDefinition) {
			var fixtureDef = self.getFixtureDef(_fixtureDefinition);
			fixtureDef.shape = new b2PolygonShape();
			_x1 /= self.scale;
			_y1 /= self.scale;
			_x2 /= self.scale;
			_y2 /= self.scale;
			fixtureDef.shape.SetAsEdge({x: _x1, y: _y1}, {x: _x2, y: _y2});
			var fixture = body.CreateFixture(fixtureDef);
			body.fixtures.push(fixture);
			return fixture;
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
		body.addImage = function (_image, offsetX, offsetY, _width, _height) {
			var image = new noname.imageComponent(_image, offsetX, offsetY, _width, _height);
			body.images.push(image);
			return image;
		};

		// addSprite
		body.addSprite = function (_image, offsetX, offsetY, _width, _height, _sourceWidth, _sourceHeight) {
			var sprite = new noname.spriteComponent(_image, offsetX, offsetY, _width, _height, _sourceWidth, _sourceHeight);
			sprite.clock = _game.time.masterClock;
			body.images.push(sprite);
			return sprite;
		};

		self.bodies.push(body);
		return body;
	};

	self.getFixtureDef = function (_fixtureDefinition) {
		_fixtureDefinition = _fixtureDefinition || {};
		var fixDef = new b2FixtureDef();
		fixDef.density = _fixtureDefinition.density || _fixtureDefinition.density === 0 ? _fixtureDefinition.density : 1;
		fixDef.friction = _fixtureDefinition.friction || _fixtureDefinition.friction === 0 ? _fixtureDefinition.friction : 0.5;
		fixDef.restitution = _fixtureDefinition.restitution || _fixtureDefinition.restitution === 0 ? _fixtureDefinition.restitution : 0.3;
		fixDef.isSensor = _fixtureDefinition.isSensor ? _fixtureDefinition.isSensor : false;
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
		self.mouseJoints = [];
	};


	self.dragStart = function (_pointer) {
		self.queryPoint(
			{x: _pointer.currentX, y: _pointer.currentY},
			function (_fixture) {
				self.mouseJoints.push(
					{
						number: _pointer.number,
						body:  _fixture.GetBody(),
						joint: null
					}
				);
			}
		);
	};

	self.dragMove = function (_pointer) {
		self.mouseJoints.forEach(function (_mouseJoint) {
			if (_mouseJoint.number === _pointer.number) {
				if (!_mouseJoint.body) {
					return;
				}
				if (!_mouseJoint.joint) {
					_mouseJoint.joint = self.createMouseJoint(
						{x: _pointer.currentX, y: _pointer.currentY},
						_mouseJoint.body
					)
				}
				_mouseJoint.joint.SetTarget(
					{x: _pointer.currentX / self.scale, y: _pointer.currentY / self.scale}
				);
			}
		});
	};

	self.dragEnd = function (_pointer) {
		self.mouseJoints.forEach(function (_mouseJoint) {
			if (_mouseJoint.number === _pointer.number) {
				_mouseJoint.body = null;
				self.destroyJoint(_mouseJoint.joint);
				_mouseJoint.joint = null;
				var index = self.mouseJoints.indexOf(_mouseJoint);
				if (index > -1) {
					self.mouseJoints.splice(index, 1);
				}
			}
		});
	};

	self.init();

};
