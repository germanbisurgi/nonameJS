var myState = new noname.state('myState');
var speed = 150;

myState.preload = function () {
    this.assets.queueImage('stone', 'example/assets/images/stone.png');
    this.assets.queueImage('falcon', 'example/assets/images/falcon.png');
    this.assets.queueImage('space', 'example/assets/images/space.jpg');
};

myState.loading = function () {
    var loading = document.querySelector('.loading');
    loading.innerText = 'loading: complete';
    if (!this.assets.loadComplete()) {
        loading.innerText = 'loading: ' + this.assets.progress();
    }
};

myState.create = function () {
    var loading = document.querySelector('.loading');
    loading.innerText = 'load complete';

    this.space = this.entities.addTileSprite('space',0,0,1024*2,1024*2);

    this.edge1 = this.box2d.addEdge(-100, 0, 190, 191, 'static');
    this.edge2 = this.box2d.addEdge(190, 190, 400, 0, 'static');

    this.polyBody = this.box2d.addBody(200, 100, 'kinematic');
    this.polyFixture1 = this.box2d.addPolygon(this.polyBody, [
        {x:   0, y:  0},
        {x:  50, y:  0},
        {x: 100, y: 25},
        {x:  50, y: 50},
        {x:   0, y: 50}
    ]);
    this.polyFixture2 = this.box2d.addPolygon(this.polyBody, [
        {x:    0, y:   0},
        {x:  -50, y:   0},
        {x: -100, y: -25},
        {x:  -50, y: -50},
        {x:    0, y: -50}
    ]);
    this.polyFixture3 = this.box2d.addRectangle(this.polyBody, 1, 1, 25, 25);
    this.polyFixture4 = this.box2d.addRectangle(this.polyBody, 1, 1, -25, -25);
    this.polyBody.m_angularVelocity = 1;

    this.shipBody = this.box2d.addBody(5, -50, 'dynamic');
    this.shipFixture1 = this.box2d.addCircle(this.shipBody, 50, 0, 13);
    this.shipFixture2 = this.box2d.addCircle(this.shipBody, 28, 0, -30);
    this.shipImage = this.entities.addImage('falcon', 0, 0, 100, 130);
    this.shipBody.SetAngularDamping(5);
    this.shipBody.SetLinearDamping(0.5);

    this.lastCameraTransform = this.camera.getTransform();
    this.currentCameraTransform = null;

};


var pausedCanFire = true;

myState.update = function () {

    // camera zoom
    if (this.inputs.pressing(['n'])) {
        this.camera.setZoom(0.4);
    }
    if (this.inputs.pressing(['m'])) {
        this.camera.setZoom(-0.4);
    }

    // move ship
    if (this.inputs.pressing(['arrowRight'])) {
        this.shipBody.ApplyTorque(500);
    }
    if (this.inputs.pressing(['arrowLeft'])) {
        this.shipBody.ApplyTorque(-500);
    }
    var currentAngle = this.shipBody.GetAngle() - 90 * 0.0174532925199432957;
    var cos = Math.cos(currentAngle);
    var sin = Math.sin(currentAngle);
    if (this.inputs.pressing(['arrowUp'])) {
        this.shipBody.ApplyForce({'x': cos * 500, 'y': sin * 500}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.pressing(['arrowDown'])) {
        this.shipBody.ApplyForce({'x': -cos  * 500, 'y': -sin * 500}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.pressing(['arrowUp'])) {
        this.shipBody.ApplyForce({'x': cos * 500, 'y': sin * 500}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.pressing(['spacebar'])) {
        this.shipBody.ApplyImpulse({'x': cos * 50, 'y': sin * 50}, this.shipBody.GetWorldCenter());
    }

    // shot
    if (this.inputs.pressing(['s'])) {
        this.bulletBody = this.box2d.addBody(
            (this.shipBody.GetPosition().x * 30),
            (this.shipBody.GetPosition().y * 30),
            'dynamic'
        );
        this.bulletFixture = this.box2d.addCircle(this.bulletBody, 5, 0, 0);
        this.bulletBody.ApplyImpulse({'x': cos * 1, 'y': sin * 1}, this.bulletBody.GetWorldCenter());
    }

    // ship image follows ship body
    this.box2d.followBody(this.shipImage, this.shipBody);

    // camera follows ship image
    this.camera.follow(this.shipImage);

    // space follows ship image
    this.space.follow(this.shipImage);

    // scroll background in relativeto the camera and body velocity
    this.currentCameraTransform = this.camera.getTransform();
    if (this.lastCameraTransform.x >= this.currentCameraTransform.x) {
        this.space.scroll('right', -this.shipBody.GetLinearVelocity().x);
    } else {
        this.space.scroll('left', this.shipBody.GetLinearVelocity().x);
    }
    if (this.lastCameraTransform.y >= this.currentCameraTransform.y) {
        this.space.scroll('down', -this.shipBody.GetLinearVelocity().y);
    } else {
        this.space.scroll('up', this.shipBody.GetLinearVelocity().y);
    }
    this.lastCameraTransform = this.currentCameraTransform;

};
