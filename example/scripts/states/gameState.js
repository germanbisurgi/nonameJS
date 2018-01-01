var gameState = new Bamboo.state('gameState');

gameState.create = function () {

    var screen = this.screen;
    var entities = this.entities;
    var events = this.events;

    this.myCamera = this.cameras.current;
    this.cameras.current.lerp = 1;

    this.myTileSprite6 = entities.addTileSprite('landscape6', 0, 0, screen.width, screen.height);
    this.myTileSprite5 = entities.addTileSprite('landscape5', 0, 0, screen.width, screen.height);
    this.myTileSprite4 = entities.addTileSprite('landscape4', 0, 0, screen.width, screen.height);
    this.myTileSprite3 = entities.addTileSprite('landscape3', 0, 0, screen.width, screen.height);
    this.myTileSprite2 = entities.addTileSprite('landscape2', 0, 0, screen.width, screen.height);
    this.myTileSprite1 = entities.addTileSprite('landscape1', 0, 0, screen.width, screen.height);

    this.mySprite = entities.addSprite('player', 50, 50, screen.col(1), screen.col(1));
    this.mySprite.addAnimation('up', [37, 38, 37, 36], 100);
    this.mySprite.addAnimation('right', [25, 26, 25, 24], 100);
    this.mySprite.addAnimation('down', [0, 1, 2, 1], 100);
    this.mySprite.addAnimation('left', [13, 14, 13, 12], 100);

    events.on('downPressed', function () {
        console.log('down pressed');
    });

};

gameState.afterCreate = function () {
    var loadScreen = document.querySelector('.loading');
    loadScreen.classList.remove('show');
};


gameState.update = function () {

    var keyboard = this.inputs.keyboard;

    // cursor controls
    if (keyboard.arrowUp) {
        this.mySprite.y -= this.time.toPPS(180);
        this.mySprite.play('up');
    }
    if (keyboard.arrowRight) {
        this.mySprite.x += this.time.toPPS(180);
        this.mySprite.play('right');
        this.myTileSprite6.scroll('left', 5);
        this.myTileSprite5.scroll('left', 12);
        this.myTileSprite4.scroll('left', 25);
        this.myTileSprite3.scroll('left', 50);
        this.myTileSprite2.scroll('left', 100);
        this.myTileSprite1.scroll('left', 200);
    }
    if (keyboard.arrowDown) {
        this.mySprite.y += this.time.toPPS(180);
        this.mySprite.play('down');
        gameState.events.emit('downPressed');
    }
    if (keyboard.arrowLeft) {
        this.mySprite.x -= this.time.toPPS(180);
        this.mySprite.play('left');
        this.myTileSprite6.scroll('right', 5);
        this.myTileSprite5.scroll('right', 12);
        this.myTileSprite4.scroll('right', 25);
        this.myTileSprite3.scroll('right', 50);
        this.myTileSprite2.scroll('right', 100);
        this.myTileSprite1.scroll('right', 200);
    }

    // camera controls
    if (keyboard.w) {
        this.myCamera.lerp = 1;
        this.myCamera.zoom += this.time.toPPS(1);
        this.myCamera.lerp = originalLerp;
    }
    if (keyboard.d) {
        this.myCamera.angle += this.time.toPPS(100);
    }
    if (keyboard.s) {
        this.myCamera.zoom -= this.time.toPPS(1);
    }
    if (keyboard.a) {
        this.myCamera.angle -= this.time.toPPS(100);
    }

    // camera follow
    //this.myCamera.follow(this.mySprite);

    this.myTileSprite1.x      = this.myTileSprite2.x      = this.myTileSprite3.x      = this.myTileSprite4.x      = this.myTileSprite5.x      = this.myTileSprite6.x      = this.myCamera.x      - this.myCamera.lerp;
    this.myTileSprite1.y      = this.myTileSprite2.y      = this.myTileSprite3.y      = this.myTileSprite4.y      = this.myTileSprite5.y      = this.myTileSprite6.y      = this.myCamera.y      - this.myCamera.lerp;
    this.myTileSprite1.width  = this.myTileSprite2.width  = this.myTileSprite3.width  = this.myTileSprite4.width  = this.myTileSprite5.width  = this.myTileSprite6.width  = this.myCamera.width  + this.myCamera.lerp * 2;
    this.myTileSprite1.height = this.myTileSprite2.height = this.myTileSprite3.height = this.myTileSprite4.height = this.myTileSprite5.height = this.myTileSprite6.height = this.myCamera.height + this.myCamera.lerp * 2;

};

gameState.postRender = function () {
    this.renderer.context.fillText('currentState:    ' + this.name, 200, 15);
    this.renderer.context.fillText('state time:      ' +  Math.floor(this.time.current / 1000), 200, 30);
};
