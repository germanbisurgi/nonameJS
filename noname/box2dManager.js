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

var Box2dManager = function(_fps, _canvas, _camera) {
    "use strict";
    var self = this;
    self.scale = 30;
    self.fps = _fps;
    self.world = new b2World(new b2Vec2(0, 50), true);
    self.debugDraw = null;
    self.context = null;

    if (_canvas) {
        self.debugDraw = new b2DebugDraw();
        self.context = _canvas.getContext("2d")
        self.debugDraw.SetSprite(self.context);
        self.debugDraw.SetDrawScale(self.scale);
        self.debugDraw.SetFlags(b2DebugDraw.e_shapeBit || b2DebugDraw.e_jointBit);
        self.world.SetDebugDraw(self.debugDraw);
    }

    self.addCircle = function (pBody, pRadius, pOffsetX, pOffsetY) {
        var fixtureDef = self.circle(pRadius);
        fixtureDef.shape.m_p = {x: pOffsetX / self.scale || 0, y: pOffsetY / self.scale || 0};
        var fixture = pBody.CreateFixture(fixtureDef);
        return fixture;
    };

    self.addRectangle = function (pBody, pWidth, pHeight, pOffsetX, pOffsetY) {
        var fixtureDef = self.rectangle(pWidth, pHeight);
        fixtureDef.shape.m_vertices.forEach(function (vert) {
            vert.x +=  pOffsetX / self.scale || 0;
            vert.y +=  pOffsetY / self.scale || 0;
        });
        fixtureDef.shape.m_centroid.x +=  pOffsetX / self.scale || 0;
        fixtureDef.shape.m_centroid.y +=  pOffsetY / self.scale || 0;
        var fixture = pBody.CreateFixture(fixtureDef);
        return fixture;
    };

    self.addPolygon = function (pBody, pPoints) {
        var fixtureDef = self.polygon(pPoints);
        var fixture = pBody.CreateFixture(fixtureDef);
        return fixture;
    };

    self.addEdge = function (pX1, pY1, pX2, pY2, pType) {
        var body = self.addBody(pX1, pY1, pType);
        var fixture = self.edge(0, 0, pX2 - pX1, pY2 - pY1);
        body.CreateFixture(fixture);
        return body;
    };

    self.followBody = function (pEntity, pBody) {
        pEntity.x = pBody.GetPosition().x * 30 - pEntity.width / 2;
        pEntity.y = pBody.GetPosition().y * 30 - pEntity.height / 2;
        pEntity.angle = pBody.GetAngle() * 57.295779513082320876;
    };

    self.followFixture = function (pEntity, pFixture) {
        var body = pFixture.GetBody();
        pEntity.x = (pFixture.GetAABB().GetCenter().x * 30 - pEntity.width  / 2);
        pEntity.y = (pFixture.GetAABB().GetCenter().y * 30 - pEntity.height / 2);
        pEntity.angle = body.GetAngle() * 57.295779513082320876;
    };

    self.addBody = function(pX, pY, pType) {
        var bodyDef = new b2BodyDef();
        bodyDef.position.x      = pX / self.scale;
        bodyDef.position.y      = pY / self.scale;
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
        if (pType === 'static')    {bodyDef.type = b2Body.b2_staticBody;}
        if (pType === 'dynamic')   {bodyDef.type = b2Body.b2_dynamicBody;}
        if (pType === 'kinematic') {bodyDef.type = b2Body.b2_kinematicBody;}
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

    self.circle = function(pRadius) {
        var fixDef = self.getFixtureDef();
        fixDef.shape = new b2CircleShape(pRadius / self.scale);
        return fixDef;
    };

    self.rectangle = function(pWidth, pHeight) {
        var fixDef = self.getFixtureDef();
        fixDef.shape = new b2PolygonShape();
        fixDef.shape.SetAsBox(pWidth * 0.5 / self.scale, pHeight * 0.5 / self.scale);
        return fixDef;
    };

    self.polygon = function(pPoints) {
        var fixDef = self.getFixtureDef();
        fixDef.shape = new b2PolygonShape();
        pPoints.forEach(function (point) {
            point.x /= self.scale;
            point.y /= self.scale;
        });
        fixDef.shape.SetAsArray(pPoints, pPoints.length);
        return fixDef;
    };

    self.edge = function(pX1, pY1, pX2, pY2) {
        var fixDef = self.getFixtureDef();
        fixDef.shape = new b2PolygonShape();
        pX1 /= self.scale;
        pY1 /= self.scale;
        pX2 /= self.scale;
        pY2 /= self.scale;
        fixDef.shape.SetAsEdge({x: pX1, y: pY1}, {x: pX2, y: pY2});
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
