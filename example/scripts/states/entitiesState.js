var entitiesState = new noname.state('entitiesState');

entitiesState.preload = function (game) {
	game.loader.queueImage('stone', 'example/assets/images/stone.png');
	game.loader.queueImage('humstar', 'example/assets/images/humstar.png');
	game.loader.queueImage('block', 'example/assets/images/block.png');
	game.loader.queueAudio('kick', 'example/assets/audio/kick.wav');
};

entitiesState.create = function (game) {
	var self = entitiesState;

	self.kick = game.audio.createTrack({
		audioBuffer: game.loader.get('kick'),
		volume: 1.0
	});

	// gravity
	game.world.setGravity(0, 9.8);

	// block factory
	var addBlock = function (x, y, type) {
		var block = game.world.addBody(x, y, type);
		block.addRectangle(0, 0, 50, 50);
		block.addImage(game.loader.get('block'), 0, 0, 50, 50);
		return block;
	};

	// blocks
	addBlock(200, 400, 'dynamic');
	addBlock(400, 300, 'dynamic');
	addBlock(500, 300, 'dynamic');
	addBlock(440, 100, 'dynamic');
	addBlock(500, 500, 'dynamic');
	addBlock(600, 200, 'dynamic');

	self.distanceJoint = game.world.createDistanceJoint({
		bodyA: addBlock(100, 100, 'static'),
		bodyB: addBlock(100, 200, 'dynamic'),
		length: 75,
		ax: 0,
		ay: 0,
		bx: 0,
		by: 0,
		frequencyHz: 1,
		damping: 0.25,
		collideConnected: false
	});

	self.revoluteJoint = game.world.createRevoluteJoint({
		bodyA: addBlock(200, 100, 'static'),
		bodyB: addBlock(200, 200, 'dynamic'),
		ax: 0,
		ay: 0,
		bx: 0,
		by: 0,
		motorSpeed: 100,
		maxMotorTorque: 2,
		enableMotor: true,
		lowerAngle: -360,
		upperAngle: 360,
		enableLimit: false,
		collideConnected: false
	});

	// static edges
	self.edges = game.world.addBody(10, 10, 'static');
	self.edges.addEdge(0, 0, window.innerWidth - 20, 0);
	self.edges.addEdge(window.innerWidth - 20, 0, window.innerWidth - 20, window.innerHeight -20);
	self.edges.addEdge(window.innerWidth - 20, window.innerHeight - 20, 0, window.innerHeight - 20);
	self.edges.addEdge(0, window.innerHeight - 20, 0, 0);

	// humstar
	self.humstar = game.world.addBody(300, 100, 'dynamic', {});
	self.humstarCircle = self.humstar.addCircle(0, 0, 25);
	self.sensor = self.humstar.addCircle(0, 0, 30, {isSensor: true, density: 0});

	self.humstarSprite = self.humstar.addSprite(game.loader.get('humstar'), 0, 0, 50, 50, 32, 32);
	self.humstarSprite.addAnimation('fly', [0, 1, 2, 3, 4]);

	// world contacts
	game.world.contacts.BeginContact = function (contact) {
		if (contact.GetFixtureA() === self.humstarCircle || contact.GetFixtureB() === self.humstarCircle) {
			self.kick.play();
		}
	}

};

entitiesState.update = function (game) {
	var self = entitiesState;

	// game.debugger.print(self.distanceBlock1, 1);

	// play humstar animation
	self.humstarSprite.play('fly', 100);

	// controls
	game.keys.pressing('ArrowRight', function () {
		// self.humstar.setVelocity(100, 0);
		self.humstar.ApplyForce({x: 3, y: 0}, self.humstar.GetWorldCenter());
	});
	game.keys.pressing('ArrowLeft', function () {
		// self.humstar.setVelocity(-100, 0);
		self.humstar.ApplyForce({x: -3, y: 0}, self.humstar.GetWorldCenter());
	});
	game.keys.justPressed('ArrowUp', function () {
		// self.humstar.setVelocity(0 ,-100);
		self.humstar.ApplyImpulse({x: 0, y: -2}, self.humstar.GetWorldCenter());
	});
	game.keys.pressing('ArrowDown', function () {
		// self.humstar.setVelocity(0 ,100);
		self.humstar.ApplyForce({x: 0, y: 2}, self.humstar.GetWorldCenter());
	});

	game.pointers.onStart(function (pointers) {
		pointers.forEach(function (pointer) {
			game.world.dragStart(pointer);
		})
	})
	game.pointers.onContinued(function (pointers) {
		pointers.forEach(function (pointer) {
			game.world.dragMove(pointer);
		})
	})
	game.pointers.onEnd(function (pointers) {
		pointers.forEach(function (pointer) {
			game.world.dragEnd(pointer);
		})
	})

	// camera
	game.keys.pressing('a', function () {
		game.render.camera.angle += 1;
	});
	game.keys.pressing('s', function () {
		game.render.camera.angle -= 1;
	});

	// change state
	game.keys.justPressed('b', function () {
		game.world.clear();
		game.state.switchPrevious();
	});
	game.keys.justPressed('n', function () {
		game.world.clear();
		game.state.switchNext();
	});
};
