var myState = new noname.state('myState');
var speed = 150;

myState.preload = function () {
    this.assets.queueImage('stone', 'example/assets/images/stone.png');
    this.assets.queueImage('falcon', 'example/assets/images/falcon.png');
    this.assets.queueImage('space', 'example/assets/images/space.jpg');
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

    //space
    this.space = this.entities.addTileSprite('space', 0,0 , 1024 * 2, 1024 * 2);

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
        this.shipBody.ApplyForce({'x': cos * 500, 'y': sin * 500}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.keyboard.pressing(['arrowDown'])) {
        this.shipBody.ApplyForce({'x': -cos  * 500, 'y': -sin * 500}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.keyboard.pressing(['arrowUp'])) {
        this.shipBody.ApplyForce({'x': cos * 500, 'y': sin * 500}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.keyboard.pressing(['spacebar'])) {
        this.shipBody.ApplyImpulse({'x': cos * 50, 'y': sin * 50}, this.shipBody.GetWorldCenter());
    }
    if (this.inputs.keyboard.pressing(['f'])) {
        this.shipBody.SetAngle(this.math.toRadians(compassAngle+180));
    }

    this.inputs.fingers.one(function (finger1) {
        console.log('one');
    });

    this.inputs.fingers.two(function (finger1, finger2) {
        console.log('two');
    });


};

myState.afterRender = function () {
    for(var i = 0; i < this.inputs.fingers.touches.length; i++) {
        var touch = this.inputs.fingers.touches[i];
        this.render.context.beginPath();
        this.render.context.fillStyle = "white";
        this.render.context.fillText("touch id : "+touch.identifier+" x:"+touch.clientX+" y:"+touch.clientY, touch.clientX+30, touch.clientY-30);
        this.render.context.beginPath();
        this.render.context.strokeStyle = "cyan";
        this.render.context.lineWidth = "6";
        this.render.context.arc(touch.clientX, touch.clientY, 40, 0, Math.PI*2, true);
        this.render.context.stroke();
    }
}
