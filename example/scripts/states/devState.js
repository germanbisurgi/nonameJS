var devState = new noname.state('devState');

devState.preload = function () {
	devState.assets.queueImage('stone', 'example/assets/images/stone.png');
	devState.assets.queueImage('player', 'example/assets/images/player.png');
};

devState.create = function () {

	/* entity */
	devState.myEntity = new noname.entity();
	devState.myEntity.addComponent('transform', new noname.transformComponent(50, 50, 50, 50));
	devState.myEntity.addComponent('clock', devState.clock.master);
	devState.myEntity.addComponent('renderable', new noname.imageComponent(devState.assets.get('stone')));

	/* body */
	devState.myBody = devState.box2d.addBody(100, 100, 'dynamic');
	devState.myBody.addCircle(5, 0, -5);
	devState.myBody.addRectangle(50, 50, -50, 25);
	devState.myBody.addPolygon([
		{x:   0, y:  0},
		{x:  50, y:  0},
		{x: 100, y: 25},
		{x:  50, y: 50},
		{x:   0, y: 50}
	], -10, 10);
	devState.myBody.addEdge(0, 0, 50, 0);
	devState.myBody.addEdge(50, 0, 50, -50);
	devState.myBody.addEdge(50, -50, 0, -50);
	devState.myBody.addEdge(0, -50, 0, -0);

	console.log(devState.myBody);

};

devState.update = function () {
	devState.myBody.ApplyTorque(50 / 30);
	// devState.box2d.followBody(devState.myEntity.transform, devState.myEntity.box2d.body);
};
