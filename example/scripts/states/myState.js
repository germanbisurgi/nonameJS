var myState = new noname.state('myState');
var speed = 150;

myState.preload = function () {
    this.assets.queueImage('stone', 'example/assets/images/stone.png');
    this.assets.queueImage('disc', 'example/assets/images/disc.png');
    this.assets.queueImage('player2', 'example/assets/images/player2.png');
    this.assets.queueImage('map', 'example/assets/images/map.png');

    this.assets.queueImage('grass', 'example/assets/images/grass.jpg');
    this.assets.queueImage('landscape1', 'example/assets/images/landscape1.png');
    this.assets.queueImage('landscape2', 'example/assets/images/landscape2.png');
    this.assets.queueImage('landscape3', 'example/assets/images/landscape3.png');
    this.assets.queueImage('landscape4', 'example/assets/images/landscape4.png');
    this.assets.queueImage('landscape5', 'example/assets/images/landscape5.png');
    this.assets.queueImage('landscape6', 'example/assets/images/landscape6.png');
    this.assets.queueImage('mine', 'example/assets/images/mine.png');
    this.assets.queueImage('rocket', 'example/assets/images/rocket.png');
    this.assets.queueImage('snow', 'example/assets/images/snow.png');
    this.assets.queueImage('player', 'example/assets/images/player.png', 32, 32);
    this.assets.queueImage('tanks', 'example/assets/images/tanks.png', 32, 32);
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

    this.entities.addImage('map', -2720*1.5, -2048*1.5, 2720*3, 2048*3);

    var player = new Player();
    this.player = player.create(this.entities);

    this.disc1 = this.entities.addImage('disc', 50, 50, 50, 50);
    this.disc2 = this.entities.addImage('disc', 50, 50, 50, 50);
    this.disc3 = this.entities.addImage('disc', 50, 50, 50, 50);
    this.disc4 = this.entities.addImage('disc', 50, 50, 50, 50);
    this.rectStone1 = this.entities.addImage('stone', 50, 50, 50, 50);
    this.rectStone2 = this.entities.addImage('stone', 50, 50, 50, 50);
    this.rectStone3 = this.entities.addImage('stone', 50, 50, 50, 50);
    this.rectStone4 = this.entities.addImage('stone', 50, 50, 50, 50);

    this.edge1 = this.box2d.addEdge(-100, 0, 190, 191, 'static');
    this.edge2 = this.box2d.addEdge(190, 190, 400, 0, 'static');

    this.circleBody = this.box2d.addBody(300, 0, 'dynamic');
    this.circleFixture1 = this.box2d.addCircle(this.circleBody, 25, -50, 0);
    this.circleFixture2 = this.box2d.addCircle(this.circleBody, 25, 50, 0);
    this.circleFixture3 = this.box2d.addCircle(this.circleBody, 25, 0, -50);
    this.circleFixture4 = this.box2d.addCircle(this.circleBody, 25, 0, 50);

    this.rectBody = this.box2d.addBody(60, 25, 'dynamic');
    this.rectFixture1 = this.box2d.addRectangle(this.rectBody, 50, 50, -50, 0);
    this.rectFixture2 = this.box2d.addRectangle(this.rectBody, 50, 50, 50, 0);
    this.rectFixture3 = this.box2d.addRectangle(this.rectBody, 50, 50, 0, -50);
    this.rectFixture4 = this.box2d.addRectangle(this.rectBody, 50, 50, 0, 50);

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

};

var pausedCanFire = true;

myState.update = function () {

    this.box2d.followFixture(this.disc1, this.circleFixture1);
    this.box2d.followFixture(this.disc2, this.circleFixture2);
    this.box2d.followFixture(this.disc3, this.circleFixture3);
    this.box2d.followFixture(this.disc4, this.circleFixture4);

    this.box2d.followFixture(this.rectStone1, this.rectFixture1);
    this.box2d.followFixture(this.rectStone2, this.rectFixture2);
    this.box2d.followFixture(this.rectStone3, this.rectFixture3);
    this.box2d.followFixture(this.rectStone4, this.rectFixture4);


    if (navigator.getGamepads()[0]) {
        var triangle = navigator.getGamepads()[0].buttons[0].pressed;
        var circle = navigator.getGamepads()[0].buttons[1].pressed;
        var x = navigator.getGamepads()[0].buttons[2].pressed;
        var square = navigator.getGamepads()[0].buttons[3].pressed;
        var l1 = navigator.getGamepads()[0].buttons[4].pressed;
        var r1 = navigator.getGamepads()[0].buttons[5].pressed;
        var l2 = navigator.getGamepads()[0].buttons[6].pressed;
        var r2 = navigator.getGamepads()[0].buttons[7].pressed;
        var select = navigator.getGamepads()[0].buttons[8].pressed;
        var start = navigator.getGamepads()[0].buttons[9].pressed;
        var up = Math.floor(navigator.getGamepads()[0].axes[1]) === -1;
        var right =  Math.floor(navigator.getGamepads()[0].axes[0]) === 1;
        var down =  Math.floor(navigator.getGamepads()[0].axes[1]) === 1;
        var left = Math.floor(navigator.getGamepads()[0].axes[0]) === -1;
    }



    if (this.inputs.pressing(['y']) || l2) {
        this.player.rotate(-speed);

    }
    if (this.inputs.pressing(['x']) || r2) {
        this.player.rotate(speed);
    }
    if (select) {
        location.reload();
    }

    if (start && pausedCanFire) {
        pausedCanFire = false;
        this.clock.master.paused = !this.clock.master.paused;
        setTimeout(function () {
            pausedCanFire = true;
        }, 200);
    }

    if (this.inputs.pressing(['arrowUp', 'arrowRight']) || up && right) {
        this.player.move(speed, -speed);
        this.player.play('walkUpRight', 100);
    } else if (this.inputs.pressing(['arrowUp', 'arrowLeft']) || up && left) {
        this.player.play('walkUpLeft', 100);
        this.player.move(-speed, -speed);
    } else if (this.inputs.pressing(['arrowDown', 'arrowRight']) || down && right) {
        this.player.move(speed, speed);
        this.player.play('walkDownRight', 100);
    } else if (this.inputs.pressing(['arrowDown', 'arrowLeft']) || down && left) {
        this.player.move(-speed, speed);
        this.player.play('walkDownLeft', 100);
    } else if (this.inputs.pressing(['arrowRight', 'arrowLeft']) || this.inputs.pressing(['arrowDown', 'arrowUp'])) {
        // nothing
    } else if (this.inputs.pressing(['arrowUp']) || up) {
        this.player.move(0, -speed);
        this.player.play('walkUp', 100);
    } else if (this.inputs.pressing(['arrowRight']) || right) {
        this.player.move(speed, 0);
        this.player.play('walkRight', 100);
    } else if (this.inputs.pressing(['arrowDown']) || down) {
        this.player.move(0, speed);
        this.player.play('walkDown', 100);
    } else if (this.inputs.pressing(['arrowLeft']) || left) {
        this.player.move(-speed, 0);
        this.player.play('walkLeft', 100);
    } else {
        switch (this.player.lastAnimation) {
            case 'walkUp':
                this.player.play('idleUp', 1);
                break;
            case 'walkRight':
                this.player.play('idleRight', 1);
                break;
            case 'walkDown':
                this.player.play('idleDown', 1);
                break;
            case 'walkLeft':
                this.player.play('idleLeft', 1);
                break;
            case 'walkUpRight':
                this.player.play('idleUpRight', 1);
                break;
            case 'walkUpLeft':
                this.player.play('idleUpLeft', 1);
                break;
            case 'walkDownRight':
                this.player.play('idleDownRight', 1);
                break;
            case 'walkDownLeft':
                this.player.play('idleDownLeft', 1);
                break;
        }
    }

    if (this.inputs.pressing(['u'])) {
        this.camera.move(0, -speed)
    }
    if (this.inputs.pressing(['k'])) {
        this.camera.move(speed, 0)
    }
    if (this.inputs.pressing(['j'])) {
        this.camera.move(0, speed)
    }
    if (this.inputs.pressing(['h'])) {
        this.camera.move(-speed, 0)
    }
    if (this.inputs.pressing(['z'])) {
        this.camera.rotate(-speed);
    }
    if (this.inputs.pressing(['i'])) {
        this.camera.rotate(speed);
    }
    if (this.inputs.pressing(['n']) || l1) {
        this.camera.setZoom(0.2);
    }
    if (this.inputs.pressing(['m']) || r1) {
        this.camera.setZoom(-0.2);
    }

    this.camera.follow(this.player.x, this.player.y, this.player.width, this.player.height);

};
