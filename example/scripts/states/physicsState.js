var physicsState = new noname.state('physicsState');

physicsState.preload = function () {
	physicsState.assets.queueImage('stone', 'example/assets/images/stone.png');
	physicsState.assets.queueImage('player', 'example/assets/images/player.png');
};

physicsState.create = function () {

	/* body */
	physicsState.myBody = physicsState.box2d.addBody(100, 100, 'dynamic');
	physicsState.myBody.addCircle(5, 0, -5);
	physicsState.myBody.addRectangle(50, 50, -50, 25);
	physicsState.myBody.addPolygon([
		{x: 0, y: 0},
		{x: 50, y: 0},
		{x: 100, y: 25},
		{x: 50, y: 50},
		{x: 0, y: 50}
	], -10, 10);
	physicsState.myBody.addEdge(0, 0, 50, 0);
	physicsState.myBody.addEdge(50, 0, 50, -50);
	physicsState.myBody.addEdge(50, -50, 0, -50);
	physicsState.myBody.addEdge(0, -50, 0, -0);

};

physicsState.update = function () {
	physicsState.myBody.ApplyTorque(50 / 30);
	// physicsState.box2d.followBody(physicsState.myEntity.transform, physicsState.myEntity.box2d.body);

	physicsState.keys.justPressed('b', function () {
		physicsState.state.switchPrevious();
	});

	physicsState.keys.justPressed('n', function () {
		physicsState.state.switchNext();
	});

};
