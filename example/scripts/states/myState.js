var myState = new noname.state('myState');
var speed = 150;

myState.preload = function () {
    myState.assets.queueImage('stone', 'example/assets/images/stone.png');
    myState.assets.queueImage('falcon', 'example/assets/images/falcon.png');
    myState.assets.queueImage('starfield', 'example/assets/images/starfield.png');
    myState.assets.queueImage('arrow', 'example/assets/images/arrow.png');
    myState.assets.queueImage('mine', 'example/assets/images/mine.png');
    myState.assets.queueImage('bullet', 'example/assets/images/bullet.png');
};

myState.loading = function () {
    var loading = document.querySelector('.loading');
    loading.innerText = 'loading: complete';
    if (!myState.assets.loadComplete()) {
        loading.innerText = 'loading: ' + myState.assets.progress();
    }
};

myState.create = function () {
    var loading = document.querySelector('.loading');
    loading.innerText = 'load complete';

    myState.render.canvas.style.background = 'black';


    //starfield
    myState.starfield = myState.entities.addTileSprite('starfield', 0,0 , 1024 * 2, 1024 * 2);

    //mine
    myState.mine = myState.entities.addImage('mine', 150, 50, 20, 20);

    // spaceship
    myState.shipBody = myState.box2d.addBody(5, -50, 'dynamic');
    myState.shipFixture1 = myState.box2d.addCircle(myState.shipBody, 50, -13, 0);
    myState.shipFixture2 = myState.box2d.addCircle(myState.shipBody, 28, 30, 0);
    myState.shipImage = myState.entities.addImage('falcon', 0, 0, 130, 100);
    myState.shipBody.SetAngularDamping(5);
    myState.shipBody.SetLinearDamping(0.5);


    // compass
    myState.compassImage = myState.entities.addImage('arrow', 50, -100, 100, 100);

    // variables
    myState.lastCameraTransform = myState.camera.getTransform();
    myState.currentCameraTransform = null;

    myState.spaceshipCanShot = false;

    // setInterval
    myState.interval = myState.clock.master.setInterval(function () {
        myState.spaceshipCanShot = true;
    }, 500, myState);

    /*myState.timeOut = myState.clock.master.setTimeout(function () {
        console.log('timeout');
    }, 1000, myState);*/

    myState.inputs.fingers.limit = 2;

};

myState.update = function () {

    // camera zoom
    if (myState.inputs.keyboard.pressing(['n'])) {
        myState.camera.setZoom(0.4);
    }
    if (myState.inputs.keyboard.pressing(['m'])) {
        myState.camera.setZoom(-0.4);
    }


    // ship image follows ship body
    myState.box2d.followBody(myState.shipImage, myState.shipBody);

    // camera follows ship image
    myState.camera.follow(myState.shipImage);

    // starfield follows ship image
    myState.starfield.follow(myState.shipImage);

    // scroll background in relativeto the camera and body velocity
    myState.currentCameraTransform = myState.camera.getTransform();
    if (myState.lastCameraTransform.x >= myState.currentCameraTransform.x) {
        myState.starfield.scroll('right', -myState.shipBody.GetLinearVelocity().x * 4);
    } else {
        myState.starfield.scroll('left', myState.shipBody.GetLinearVelocity().x * 4);
    }
    if (myState.lastCameraTransform.y >= myState.currentCameraTransform.y) {
        myState.starfield.scroll('down', -myState.shipBody.GetLinearVelocity().y * 4);
    } else {
        myState.starfield.scroll('up', myState.shipBody.GetLinearVelocity().y * 4);
    }
    myState.lastCameraTransform = myState.currentCameraTransform;

    // compass
    myState.compassImage.setPosition(myState.camera.x / myState.camera.zoom, myState.camera.y / myState.camera.zoom);
    myState.compassAngle = myState.math.angleToPointer(
        myState.shipImage.x + myState.shipImage.width / 2,
        myState.shipImage.y + myState.shipImage.height / 2,
        myState.mine.x + myState.mine.width / 2,
        myState.mine.y + myState.mine.height / 2
    );
    myState.compassImage.setAngle(myState.compassAngle);

    //touch controller
    var leftController = null;
    var rightController = null;
    myState.inputs.fingers.pool.forEach(function (_finger) {
        if (_finger.startX <= window.innerWidth / 2 ) {
            if (!leftController) {
                leftController = _finger;
                if (leftController.offsetX !== 0 && leftController.offsetY !== 0) {
                    // angle
                    myState.spaceshipAngle = myState.math.toRadians(myState.math.angleToPointer(
                        leftController.offsetX,
                        leftController.offsetY,
                        0,
                        0
                    ));
                    myState.shipBody.SetAngle(myState.spaceshipAngle);
                    // force
                    myState.controllerOffset = Math.floor(myState.math.distance(0,0,leftController.offsetX, leftController.offsetY)) || 0;
                    myState.spaceshipForce = myState.math.clamp(myState.controllerOffset * 8, 0, 600);
                    myState.shipBody.ApplyForce(
                        {
                            'x': Math.cos(myState.spaceshipAngle) * myState.spaceshipForce,
                            'y': Math.sin(myState.spaceshipAngle) * myState.spaceshipForce
                        },
                        myState.shipBody.GetWorldCenter()
                    );
                }
            }
        } else {
            if (!rightController) {
                rightController = _finger;
                if (myState.spaceshipCanShot) {

                    myState.spaceshipCanShot = false;

                    // angle
                    myState.spaceshipAngle = myState.shipBody.GetAngle();
                    myState.spaceshipPosition = myState.shipBody.GetPosition();
                    // bullet
                    myState.bullet = myState.box2d.addBody(
                        myState.spaceshipPosition.x * 30 + Math.cos(myState.spaceshipAngle) * 3 * 30,
                        myState.spaceshipPosition.y * 30 + Math.sin(myState.spaceshipAngle) * 3 * 30,
                        'dynamic'
                    );
                    myState.bulletFixture = myState.box2d.addCircle(myState.bullet, 5, 0, 0);
                    myState.bullet.ApplyForce(
                        {
                            'x': Math.cos(myState.spaceshipAngle) * 5000,
                            'y': Math.sin(myState.spaceshipAngle) * 5000
                        },
                        myState.bullet.GetWorldCenter()
                    );

                    console.log('shot');




                }
            }
        }
    });

};

myState.afterRender = function () {

    myState.inputs.fingers.pool.forEach(function (_finger) {
        myState.render.context.strokeStyle = _finger.startX <= window.innerWidth / 2 ? 'cyan' : 'magenta';
        myState.render.context.lineWidth = "6";
        myState.render.context.beginPath();
        myState.render.context.arc(_finger.startX, _finger.startY, 60, 0, Math.PI * 2, true);
        myState.render.context.stroke();
        myState.render.context.beginPath();
        myState.render.context.arc(_finger.currentX, _finger.currentY, 30, 0, Math.PI * 2, true);
        myState.render.context.stroke();

        if (myState.spaceshipForce) {
            myState.render.context.fillStyle = "cyan";
            myState.render.context.fillText(myState.spaceshipForce, _finger.currentX -5, _finger.currentY - 40);
        }

    });

    myState.render.context.fillStyle = "yellow";
    var distanceGoal = Math.floor(myState.math.distance(
        myState.shipImage.x + myState.shipImage.width / 2,
        myState.shipImage.y + myState.shipImage.height / 2,
        myState.mine.x + myState.mine.width / 2,
        myState.mine.y + myState.mine.height / 2
    ));
    myState.render.context.fillText(String(distanceGoal), window.innerWidth / 10, window.innerHeight / 10);

};
