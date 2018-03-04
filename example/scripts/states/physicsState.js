var physicsState = new noname.state('physicsState');

physicsState.preload = function () {
	var loading = document.querySelector('.loading');
	var asset = document.querySelector('.loading-asset');
	var progress = document.querySelector('.loading-progress');

	physicsState.assets.queueAudio('kick', 'example/assets/audio/kick.wav');
	physicsState.assets.queueAudio('tic', 'example/assets/audio/tic.mp3');

	physicsState.assets.pubsub.subscribe('loading', function () {
		loading.setAttribute('style', 'display: block;');
	});

	physicsState.assets.pubsub.subscribe('onload', function (_data) {
		asset.innerText = 'loading: ' + _data.name;
		progress.setAttribute('style', 'width: ' + physicsState.assets.progress() + '%;');
	});

	physicsState.assets.pubsub.subscribe('done', function () {
		asset.innerText = 'loading: DONE';
		setTimeout(function () {
			loading.setAttribute('style', 'display: none;');
		}, 1000);
	});
};

physicsState.create = function () {

	physicsState.kick = physicsState.audio.createTrack({
		audioBuffer: physicsState.assets.get('kick'),
		volume: 1.0
	});

	physicsState.tic = physicsState.audio.createTrack({
		audioBuffer: physicsState.assets.get('tic'),
		volume: 0.5
	});

	physicsState.box2d.setGravity(0, 10);

	physicsState.myLimits = physicsState.box2d.addBody(10, 10, 'static');
	physicsState.myLimits.addEdge(0, 0, window.innerWidth - 20, 0);
	physicsState.myLimits.addEdge(window.innerWidth - 20, 0, window.innerWidth - 20, window.innerHeight -20);
	physicsState.myLimits.addEdge(window.innerWidth - 20, window.innerHeight - 20, 0, window.innerHeight - 20);
	physicsState.myLimits.addEdge(0, window.innerHeight - 20, 0, 0);

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

	physicsState.fingers.justTouched(1, function (finger) {
		physicsState.box2d.queryPoint(
			{x: finger.currentX, y: finger.currentY},
			function (_fixture) {
				physicsState.mouseJointObject = _fixture.GetBody();
			}
		);
	});

	physicsState.fingers.touching(1, function (finger) {
		if (!physicsState.mouseJointObject) {
			return;
		}
		if (!physicsState.mouseJoint) {
			physicsState.mouseJoint = physicsState.box2d.createMouseJoint(
				{x: finger.currentX, y: finger.currentY},
				physicsState.mouseJointObject
			)
		}
		physicsState.mouseJoint.SetTarget(
			physicsState.box2d.calculateWorldPosition(
				{x: finger.currentX, y: finger.currentY}
			)
		);
	});

	physicsState.fingers.released(1, function () {
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
		physicsState.kick.play();
	};

	myLogger.print(physicsState.box2d.world.GetContactList());

	physicsState.keys.justPressed('b', function () {
		physicsState.state.switchPrevious();
	});

	physicsState.keys.justPressed('n', function () {
		physicsState.state.switchNext();
	});

};
