var physicsState = new noname.state('physicsState');

physicsState.preload = function () {
	physicsState.assets.queueImage('stone', 'example/assets/images/stone.png');
	physicsState.assets.queueImage('player', 'example/assets/images/player.png');
};

physicsState.create = function () {

	physicsState.box2d.setGravity(0, 10);

	physicsState.myLimits = physicsState.box2d.addBody(10, 300, 'static');
	physicsState.myLimits.addEdge(0, 0, 600, 0);

	physicsState.mySimpleBody = physicsState.box2d.addBody(250, 100, 'dynamic');
	physicsState.mySimpleBody.addRectangle(50, 50, 0, 0);




	/* body */
	/*physicsState.myBody = physicsState.box2d.addBody(300, 100, 'dynamic');
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
	physicsState.myBody.addEdge(0, -50, 0, -0);*/

};

physicsState.update = function () {
	//physicsState.mySimpleBody.ApplyTorque(100);

	physicsState.mouse.pressing(0, function (button) {
		physicsState.box2d.queryPoint(button.currentX, button.currentY, function (_fixture) {
			var body = _fixture.GetBody();
			var point = {x: 0 / 30, y: 0 / 30};
			body.ApplyForce({x: 0, y: -100}, body.GetWorldPoint(point));
		});
	});

	physicsState.keys.justPressed('b', function () {
		physicsState.state.switchPrevious();
	});

	physicsState.keys.justPressed('n', function () {
		physicsState.state.switchNext();
	});

};
