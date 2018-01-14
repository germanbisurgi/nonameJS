var myState = new noname.state('myState');
var speed = 150;

// ---------------------------------------------------------------------- preload

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

// ---------------------------------------------------------------------- create

myState.create = function () {

    var loading = document.querySelector('.loading');
    loading.innerText = 'load complete';


    myState.render.canvas.style.background = 'black';
    myState.inputs.fingers.limit = 2;
    myState.lastCameraTransform = myState.camera.getTransform();
    myState.currentCameraTransform = null;

    //starfield
    myState.starfield = myState.entities.addTileSprite('starfield', 0,0 , 1024 * 2, 1024 * 2);

    //mine
    myState.mine = myState.entities.addImage('mine', 150, 50, 20, 20);

    // compass
    myState.compassImage = myState.entities.addImage('arrow', 50, -100, 100, 100);

    // spaceship
    myState.spaceship = new Spaceship(myState);
    console.log(myState.spaceship);

};

// ---------------------------------------------------------------------- update

myState.update = function () {

    myState.spaceship.update();


    // startfield
    myState.starfield.follow(myState.spaceship.image);
    myState.currentCameraTransform = myState.camera.getTransform();
    if (myState.lastCameraTransform.x >= myState.currentCameraTransform.x) {
        myState.starfield.scroll('right', -myState.spaceship.body.GetLinearVelocity().x * 4);
    } else {
        myState.starfield.scroll('left', myState.spaceship.body.GetLinearVelocity().x * 4);
    }
    if (myState.lastCameraTransform.y >= myState.currentCameraTransform.y) {
        myState.starfield.scroll('down', -myState.spaceship.body.GetLinearVelocity().y * 4);
    } else {
        myState.starfield.scroll('up', myState.spaceship.body.GetLinearVelocity().y * 4);
    }
    myState.lastCameraTransform = myState.currentCameraTransform;


    // compass
    myState.compassImage.setPosition(myState.camera.x / myState.camera.zoom, myState.camera.y / myState.camera.zoom);
    myState.compassAngle = myState.math.pointToAngle(
        myState.mine.x + myState.mine.width / 2,
        myState.mine.y + myState.mine.height / 2,
        myState.spaceship.image.x + myState.spaceship.image.width / 2,
        myState.spaceship.image.y + myState.spaceship.image.height / 2
    );
    myState.compassImage.setAngle(myState.compassAngle);

};

// ---------------------------------------------------------------- after render

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

        if (myState.spaceship.force) {
            myState.render.context.fillStyle = "cyan";
            myState.render.context.fillText(myState.spaceship.force, _finger.currentX -5, _finger.currentY - 40);
        }

    });

    myState.render.context.fillStyle = "yellow";
    var distanceGoal = Math.floor(myState.math.distance(
        myState.spaceship.image.x + myState.spaceship.image.width / 2,
        myState.spaceship.image.y + myState.spaceship.image.height / 2,
        myState.mine.x + myState.mine.width / 2,
        myState.mine.y + myState.mine.height / 2
    ));
    myState.render.context.fillText(String(distanceGoal), window.innerWidth / 10, window.innerHeight / 10);

};
