var physicsState = new noname.state('physicsState');

physicsState.preload = function () {
	physicsState.assets.queueImage('stone', 'example/assets/images/stone.png');
	physicsState.assets.queueImage('player', 'example/assets/images/player.png');
};

physicsState.create = function () {

	physicsState.box2d.setGravity(0, 10);

	physicsState.myLimits = physicsState.box2d.addBody(10, 300, 'static');
	physicsState.myLimits.addEdge(0, 0, 600, 0);

	physicsState.simpleBody = physicsState.box2d.addBody(100, 100, 'dynamic');
	physicsState.simpleBody.addRectangle(50, 50, 0, 0);
	physicsState.simpleBody.SetUserData({
		id: 'simple-body',
		colliding: false,
		body: physicsState.simpleBody
	});

	/* body */
	physicsState.complexBody = physicsState.box2d.addBody(300, 100, 'dynamic');
	physicsState.complexBody.addCircle(5, 0, -5);
	physicsState.complexBody.addRectangle(50, 50, -50, 25);
	physicsState.complexBody.addPolygon([
		{x: 0, y: 0},
		{x: 50, y: 0},
		{x: 100, y: 25},
		{x: 50, y: 50},
		{x: 0, y: 50}
	], -10, 10);

	physicsState.mouseJoint = null;
	physicsState.mouseJointObject = null;

};

physicsState.update = function () {

	physicsState.mouse.justPressed(0, function (button) {
		console.log('just');
		physicsState.box2d.queryPoint(
			{x: button.currentX, y: button.currentY},
			function (_fixture) {
				physicsState.mouseJointObject = _fixture.GetBody();
			}
		);
	});

	physicsState.mouse.moved(function (_point) {
		console.log('moved');

		if (!physicsState.mouseJointObject) {
			return;
		}
		if (!physicsState.mouseJoint) {
			physicsState.mouseJoint = physicsState.box2d.createMouseJoint(
				_point,
				physicsState.mouseJointObject
			)
		}
		physicsState.mouseJoint.SetTarget(
			physicsState.box2d.calculateWorldPosition(
				_point
			)
		);
	});

	physicsState.mouse.released(0, function () {
		console.log('just');

		if (physicsState.mouseJointObject) {
			physicsState.mouseJointObject = null;
		}

		if (physicsState.mouseJoint) {
			physicsState.box2d.destroyJoint(physicsState.mouseJoint);
			physicsState.mouseJoint = null;
		}
	});

	physicsState.box2d.contacts.BeginContact = function (contact) {
		var bodyA = contact.GetFixtureA().GetBody().GetUserData();
		var bodyB = contact.GetFixtureB().GetBody().GetUserData();
		bodyA.colliding = true;
		bodyB.colliding = true;
	};

	myLogger.print(physicsState.mouse);

	physicsState.keys.justPressed('b', function () {
		physicsState.state.switchPrevious();
	});

	physicsState.keys.justPressed('n', function () {
		physicsState.state.switchNext();
	});

};
