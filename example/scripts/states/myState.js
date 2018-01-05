var myState = new noname.state('myState');
var speed = 150;

myState.preload = function () {
    this.assets.queueImage('stone', 'example/assets/images/stone.png');
    this.assets.queueImage('falcon', 'example/assets/images/falcon.png');
    this.assets.queueImage('stars', 'example/assets/images/stars.png');
    this.assets.queueImage('arrow', 'example/assets/images/arrow.png');
    this.assets.queueImage('mine', 'example/assets/images/mine.png');
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

    this.render.canvas.style.background = 'black';

    //stars
    this.stars = this.entities.addTileSprite('stars', 0,0 , 1024 * 2, 1024 * 2);

    //mine
    this.mine = this.entities.addTileSprite('mine', 150, 50, 20, 20);

    // ship
    this.shipBody = this.box2d.addBody(5, -50, 'dynamic');
    this.shipFixture1 = this.box2d.addCircle(this.shipBody, 50, -13, 0);
    this.shipFixture2 = this.box2d.addCircle(this.shipBody, 28, 30, 0);
    this.shipImage = this.entities.addImage('falcon', 0, 0, 130, 100);
    this.shipBody.SetAngularDamping(5);
    this.shipBody.SetLinearDamping(0.5);

    // compass
    this.compassImage = this.entities.addImage('arrow', 50, -100, 100, 100);

    // variables
    this.lastCameraTransform = this.camera.getTransform();
    this.currentCameraTransform = null;

};


var pausedCanFire = true;

myState.update = function () {


    var currentAngle = this.shipBody.GetAngle();
    var cos = Math.cos(currentAngle);
    var sin = Math.sin(currentAngle);

    // camera zoom
    if (this.inputs.keyboard.pressing(['n'])) {
        this.camera.setZoom(0.4);
    }
    if (this.inputs.keyboard.pressing(['m'])) {
        this.camera.setZoom(-0.4);
    }


    // ship image follows ship body
    this.box2d.followBody(this.shipImage, this.shipBody);

    // camera follows ship image
    this.camera.follow(this.shipImage);

    // stars follows ship image
    this.stars.follow(this.shipImage);

    // scroll background in relativeto the camera and body velocity
    this.currentCameraTransform = this.camera.getTransform();
    if (this.lastCameraTransform.x >= this.currentCameraTransform.x) {
        this.stars.scroll('right', -this.shipBody.GetLinearVelocity().x);
    } else {
        this.stars.scroll('left', this.shipBody.GetLinearVelocity().x);
    }
    if (this.lastCameraTransform.y >= this.currentCameraTransform.y) {
        this.stars.scroll('down', -this.shipBody.GetLinearVelocity().y);
    } else {
        this.stars.scroll('up', this.shipBody.GetLinearVelocity().y);
    }
    this.lastCameraTransform = this.currentCameraTransform;

    // compass
    this.compassImage.setPosition(this.camera.x / this.camera.zoom, this.camera.y / this.camera.zoom);
    var compassAngle = this.math.angleToPointer(
        this.shipImage.x + this.shipImage.width / 2,
        this.shipImage.y + this.shipImage.height / 2,
        this.mine.x + this.mine.width / 2,
        this.mine.y + this.mine.height / 2
    );
    this.compassImage.setAngle(compassAngle);

    // move ship
    if (this.inputs.keyboard.pressing(['arrowRight'])) {
        this.shipBody.ApplyTorque(500);
    }
    if (this.inputs.keyboard.pressing(['arrowLeft'])) {
        this.shipBody.ApplyTorque(-500);
    }

    var currentAngle = this.shipBody.GetAngle();
    var cos = Math.cos(currentAngle);
    var sin = Math.sin(currentAngle);

    if (this.inputs.keyboard.pressing(['arrowUp'])) {
        this.shipBody.ApplyForce({'x': cos * 250, 'y': sin * 250}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.keyboard.pressing(['arrowDown'])) {
        this.shipBody.ApplyForce({'x': -cos  * 250, 'y': -sin * 250}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.keyboard.pressing(['arrowUp'])) {
        this.shipBody.ApplyForce({'x': cos * 250, 'y': sin * 250}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.keyboard.pressing(['spacebar'])) {
        this.shipBody.ApplyImpulse({'x': cos * 25, 'y': sin * 25}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.keyboard.pressing(['f'])) {
        this.shipBody.SetAngle(this.math.toRadians(compassAngle+180));
    }


    //touch controller
    var leftController = null;
    var rightController = null;
    this.inputs.fingers.pool.forEach(function (_finger) {
        if (_finger.startX <= window.innerWidth / 2 ) {
            if (!leftController) {
                leftController = _finger;
                myState.shipBody.ApplyTorque(_finger.offsetX * 10);
            }
        } else {
            if (!rightController) {
                rightController = _finger;
                myState.shipBody.ApplyForce({'x': cos * _finger.offsetY * -5, 'y': sin * _finger.offsetY * -5}, myState.shipBody.GetWorldCenter());
            }
        }
    });


};

myState.afterRender = function () {

    this.inputs.fingers.pool.forEach(function (_finger) {
        var halfWindow = window.innerWidth / 2;
        var strokeStyle = _finger.startX <= halfWindow ? 'cyan' : 'magenta';
        myState.render.context.strokeStyle = strokeStyle;
        myState.render.context.lineWidth = "6";
        myState.render.context.beginPath();
        myState.render.context.arc(_finger.startX, _finger.startY, 60, 0, Math.PI * 2, true);
        myState.render.context.stroke();

        myState.render.context.beginPath();
        myState.render.context.arc(_finger.currentX, _finger.currentY, 30, 0, Math.PI * 2, true);
        myState.render.context.stroke();

    });

}
