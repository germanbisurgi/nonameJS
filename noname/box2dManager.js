var b2Vec2            = Box2D.Common.Math.b2Vec2;
var b2BodyDef         = Box2D.Dynamics.b2BodyDef;
var b2Body            = Box2D.Dynamics.b2Body;
var b2FixtureDef      = Box2D.Dynamics.b2FixtureDef;
var b2Fixture         = Box2D.Dynamics.b2Fixture;
var b2World           = Box2D.Dynamics.b2World;
var b2MassData        = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape    = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape     = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw       = Box2D.Dynamics.b2DebugDraw;
var b2Contacts        = Box2D.Dynamics.Contacts;
var b2ContactListener = Box2D.Dynamics.b2ContactListener;

var Box2dManager = function(_config, _camera) {
    "use strict";
    var self = this;
    self.scale = 30;
    self.fps = _config.fps;
    self.world = new b2World(new b2Vec2(0, 50), true);
    self.debugDraw = null;
    self.canvas = null;
    self.context = null;
    self.screen = _config.screen;

    self.init = function () {
        self.canvas = document.createElement('canvas');
        self.canvas.setAttribute('style', 'position: absolute; opacity: 0.6;');
        self.context = self.canvas.getContext("2d");
        self.screen.appendChild(self.canvas);
        self.debugDraw = new b2DebugDraw();
        self.debugDraw.SetSprite(self.context);
        self.debugDraw.SetDrawScale(self.scale);
        self.debugDraw.SetFlags(b2DebugDraw.e_shapeBit || b2DebugDraw.e_jointBit);
        self.world.SetDebugDraw(self.debugDraw);
    }

    self.init();

    self.resize = function () {
        self.canvas.width = _config.screen.clientWidth
        self.canvas.height = _config.screen.clientHeight;
    };

    self.addCircle = function (_body, _radius, _offsetX, _offsetY) {
        var fixtureDef = self.circle(_radius);
        fixtureDef.shape.m_p = {x: _offsetX / self.scale || 0, y: _offsetY / self.scale || 0};
        var fixture = _body.CreateFixture(fixtureDef);
        return fixture;
    };

    self.addRectangle = function (_body, _width, _height, _offsetX, _offsetY) {
        var fixtureDef = self.rectangle(_width, _height);
        fixtureDef.shape.m_vertices.forEach(function (vert) {
            vert.x +=  _offsetX / self.scale || 0;
            vert.y +=  _offsetY / self.scale || 0;
        });
        fixtureDef.shape.m_centroid.x +=  _offsetX / self.scale || 0;
        fixtureDef.shape.m_centroid.y +=  _offsetY / self.scale || 0;
        var fixture = _body.CreateFixture(fixtureDef);
        return fixture;
    };

    self.addPolygon = function (_body, _points) {
        var fixtureDef = self.polygon(_points);
        var fixture = _body.CreateFixture(fixtureDef);
        return fixture;
    };

    self.addEdge = function (_x1, _y1, _x2, _y2, _type) {
        var body = self.addBody(_x1, _y1, _type);
        var fixture = self.edge(0, 0, _x2 - _x1, _y2 - _y1);
        body.CreateFixture(fixture);
        return body;
    };

    self.followBody = function (_entity, _body) {
        _entity.x = _body.GetPosition().x * 30 - _entity.width / 2;
        _entity.y = _body.GetPosition().y * 30 - _entity.height / 2;
        _entity.angle = _body.GetAngle() * 57.295779513082320876;
    };

    self.followFixture = function (_entity, _fixture) {
        var body = _fixture.GetBody();
        _entity.x = (_fixture.GetAABB().GetCenter().x * 30 - _entity.width  / 2);
        _entity.y = (_fixture.GetAABB().GetCenter().y * 30 - _entity.height / 2);
        _entity.angle = body.GetAngle() * 57.295779513082320876;
    };

    self.addBody = function(_x, _y, _type) {
        var bodyDef = new b2BodyDef();
        bodyDef.position.x      = _x / self.scale;
        bodyDef.position.y      = _y / self.scale;
        bodyDef.active          = true;
        bodyDef.allowSleep      = true;
        bodyDef.angle           = 0;
        bodyDef.angularDamping  = 0;
        bodyDef.angularVelocity = 0;
        bodyDef.awake           = true;
        bodyDef.bullet          = false;
        bodyDef.fixedRotation   = false;
        bodyDef.linearDamping   = 0;
        bodyDef.linearVelocity  = {'x': 0, 'y': 0};
        bodyDef.userData        = '';
        if (_type === 'static')    {bodyDef.type = b2Body.b2_staticBody;}
        if (_type === 'dynamic')   {bodyDef.type = b2Body.b2_dynamicBody;}
        if (_type === 'kinematic') {bodyDef.type = b2Body.b2_kinematicBody;}
        var body = self.world.CreateBody(bodyDef);
        return body;
    };

    self.getFixtureDef = function() {
        var fixDef = new b2FixtureDef();
        fixDef.density     = 1;
        fixDef.friction    = 0.5;
        fixDef.isSensor    = false;
        fixDef.restitution = 0.0;
        return fixDef;
    };

    self.circle = function(_radius) {
        var fixDef = self.getFixtureDef();
        fixDef.shape = new b2CircleShape(_radius / self.scale);
        return fixDef;
    };

    self.rectangle = function(_width, _height) {
        var fixDef = self.getFixtureDef();
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(_width * 0.5 / self.scale, _height * 0.5 / self.scale);
        return fixDef;
    };

    self.polygon = function(_points) {
        var fixDef = self.getFixtureDef();
        fixDef.shape = new b2PolygonShape();
        _points.forEach(function (_point) {
            _point.x /= self.scale;
            _point.y /= self.scale;
        });
        fixDef.shape.SetAsArray(_points, _points.length);
        return fixDef;
    };

    self.edge = function(_x1, _y1, _x2, _y2) {
        var fixDef = self.getFixtureDef();
        fixDef.shape = new b2PolygonShape();
        _x1 /= self.scale;
        _y1 /= self.scale;
        _x2 /= self.scale;
        _y2 /= self.scale;
        fixDef.shape.SetAsEdge({x: _x1, y: _y1}, {x: _x2, y: _y2});
        return fixDef;
    };

    self.contactListener = function() {
        var listener = new b2ContactListener();
        self.world.SetContactListener(listener);
        return listener;
    };

    self.update = function() {
        self.world.Step(1/self.fps, 8, 3);
        self.world.ClearForces();
    };

    self.draw = function() {
        if (self.debugDraw) {
            self.context.save();
            // camera rotation
            self.context.translate((_camera.width * _camera.anchorX), (_camera.height * _camera.anchorY));
            self.context.rotate(self.toRadians(-_camera.angle));
            self.context.translate(-(_camera.width * _camera.anchorX), -(_camera.height * _camera.anchorY));
            // camera position
            self.context.translate(-_camera.x, -_camera.y);
            // camera zoom.
            self.context.scale(_camera.zoom, _camera.zoom);
            self.world.DrawDebugData();
            self.context.restore();
        }
    };

    self.toRadians = function (_degrees) {
        return _degrees * 0.0174532925199432957;
    };

    self.clear = function () {
        self.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

};
