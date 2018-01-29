var devState = new noname.state('devState');

devState.preload = function () {
    devState.assets.queueImage('stone', 'example/assets/images/stone.png');
    devState.assets.queueImage('player', 'example/assets/images/player.png');
};

devState.create = function () {
    devState.myEntity = new noname.entity();
    devState.myEntity.addComponent('transform', new noname.transformComponent(50, 50, 50, 50));
    devState.myEntity.addComponent('clock', devState.clock.master);
    devState.myEntity.addComponent('renderable', new noname.imageComponent(devState.assets.get('stone')));
    devState.myEntity.addComponent('box2d', new noname.box2dComponent(150, 150, 'dynamic', devState));
    devState.myEntity.box2d.addRectangleFixture(50, 50);
    devState.entities.add(devState.myEntity);
    console.log(devState.myEntity);
};

devState.update = function () {
    devState.myEntity.box2d.body.ApplyTorque(50 / 30);
    devState.box2d.followBody(devState.myEntity.transform, devState.myEntity.box2d.body);
};
