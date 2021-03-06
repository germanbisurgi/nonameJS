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

	// world contacts
	game.world.contacts.BeginContact = function (contact) {
		if (contact.GetFixtureA() === self.humstarCircle || contact.GetFixtureB() === self.humstarCircle) {
			self.kick.play();
		}
	}

	// gravity
	game.world.setGravity(0, 0);

	// block factory
	var addBlock = function (x, y, w, h, type) {
		var block = game.world.addBody(x, y, type);
		block.addRectangle(0, 0, w, h);
		block.addImage(game.loader.get('block'), 0, 0, w, h);
		return block;
	};

	// ball factory
	var addBall = function (x, y, r, type) {
		var ball = game.world.addBody(x, y, type);
		ball.addCircle(0, 0, r);
		return ball;
	};

	// static edges
	self.edges = game.world.addBody(10, 10, 'static');
	self.edges.addEdge(0, 0, window.innerWidth - 20, 0);
	self.edges.addEdge(window.innerWidth - 20, 0, window.innerWidth - 20, window.innerHeight -20);
	self.edges.addEdge(window.innerWidth - 20, window.innerHeight - 20, 0, window.innerHeight - 20);
	self.edges.addEdge(0, window.innerHeight - 20, 0, 0);

	// humstar
	self.humstar = game.world.addBody(400, 50, 'dynamic', {});
	self.humstarCircle = self.humstar.addCircle(0, 0, 25);
	self.sensor = self.humstar.addCircle(0, 0, 30, {isSensor: true, density: 0});
	self.humstarSprite = self.humstar.addSprite(game.loader.get('humstar'), 0, 0, 50, 50, 32, 32);
	self.humstarSprite.addAnimation('fly', [0, 1, 2, 3, 4]);

	// distance joint
	self.distanceJoint = game.world.createDistanceJoint({
		bodyA: addBlock(100, 100, 50, 50, 'static'),
		bodyB: addBlock(100, 200, 50, 50, 'dynamic'),
		length: 75,
		ax: 0,
		ay: 0,
		bx: 0,
		by: 0,
		frequencyHz: 2,
		damping: 0.25,
		collideConnected: false
	});

	// revolute joint
	var chasis = addBlock(50, 300, 150, 70, 'dynamic');
	
	self.revoluteJoint = game.world.createRevoluteJoint({
		bodyA: chasis,
		bodyB: addBall(50, 300, 30, 'dynamic'),
		ax: -50,
		ay: 25,
		bx: 0,
		by: 0,
		motorSpeed: 360*10,
		maxMotorTorque: 200,
		enableMotor: true,
		lowerAngle: 0,
		upperAngle: 0,
		enableLimit: false,
		collideConnected: false
	});

	self.revoluteJoint = game.world.createRevoluteJoint({
		bodyA: chasis,
		bodyB: addBall(100, 300, 50, 'dynamic'),
		ax: 50,
		ay: 25
	});

	// prismatic joint
	self.prismaticJoint = game.world.createPrismaticJoint({
		bodyA: addBlock(600, 300, 50, 50, 'static'),
		bodyB: addBlock(600, 300, 50, 50, 'dynamic'),
		axisX: -1,
		axisY: 0,
		ax: 0,
		ay: 0,
		bx: 0,
		by: 0,
		lowerTranslation: 0,
		upperTranslation: 50,
		enableLimit: true,
		motorSpeed: 300,
		maxMotorForce: 300,
		enableMotor: true,
		collideConnected: false
	});

	// prismatic joint
	var bodyA = addBlock(300, 100, 50, 50, 'dynamic');
	var bodyB = addBlock(400, 100, 50, 50, 'dynamic');

	self.pulleyJoint = game.world.createPulleyJoint({
		bodyA: bodyA,
		bodyB: bodyB,
		groundAnchorA: {x: 300, y: 100},
		groundAnchorB: {x: 400, y: 100},
		offsetA: {x: 0, y: 0},
		offsetB: {x: 0, y: 0},
		ratio: 1,
		lengthA: 100,
		lengthB: 100,
	});
};

entitiesState.update = function (game) {
	var self = entitiesState;

	// game.debugger.print(1, {devicePixelRatio: window.devicePixelRatio});

	// play humstar animation
	self.humstarSprite.play('fly', 100);

	// controls
	game.keys.pressing('ArrowRight', function () {
		// self.humstar.setVelocity(300, 0);
		self.humstar.ApplyForce({x: 3, y: 0}, self.humstar.GetWorldCenter());
	});
	game.keys.pressing('ArrowLeft', function () {
		// self.humstar.setVelocity(-300, 0);
		self.humstar.ApplyForce({x: -3, y: 0}, self.humstar.GetWorldCenter());
	});
	game.keys.pressing('ArrowUp', function () {
		// self.humstar.setVelocity(0 ,-300);
		self.humstar.ApplyForce({x: 0, y: -3}, self.humstar.GetWorldCenter());
	});
	game.keys.pressing('ArrowDown', function () {
		// self.humstar.setVelocity(0 ,300);
		self.humstar.ApplyForce({x: 0, y: 2}, self.humstar.GetWorldCenter());
	});

	game.pointers.onStart('*', '*', function (pointer) {
		game.world.dragStart(pointer);
	})
	game.pointers.onContinued('*', '*', function (pointer) {
		game.world.dragMove(pointer);
	})
	game.pointers.onEnd('*', '*', function (pointer) {
		game.world.dragEnd(pointer);
		var query = game.world.queryAABB(
			{x: pointer.startX, y: pointer.startY},
			{x: pointer.currentX, y: pointer.currentY}
		);
		//console.log(query.fixtures);
	})

	// camera
	game.keys.pressing('a', function () {
		game.render.camera.angle += game.mathematics.toRadians(1);
	});
	game.keys.pressing('s', function () {
		game.render.camera.angle -= game.mathematics.toRadians(1);
	});

	// camera
	game.render.camera.follow(
		self.humstar.GetPosition().x * game.world.scale,
		self.humstar.GetPosition().y * game.world.scale
	);

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

entitiesState.afterRender = function (game) {
	var self = this;
	game.pointers.continued.forEach(function (pointer) {
		game.render.context.save();
		game.render.context.strokeStyle = 'cyan';
		game.render.context.lineWidth = '6';
		game.render.context.beginPath();
		game.render.context.arc(pointer.startX, pointer.startY, 60, 0, Math.PI * 2, true);
		game.render.context.stroke();
		game.render.context.beginPath();
		game.render.context.arc(pointer.currentX, pointer.currentY, 30, 0, Math.PI * 2, true);
		game.render.context.stroke();
		game.render.context.fillText(
			'type: ' + pointer.type + ', number: ' + pointer.number,
			pointer.startX - 30,
			pointer.startY - 100
		);
		game.render.context.fillText(
			'startX: ' + pointer.startX + ', startY: ' + pointer.startY,
			pointer.startX - 30,
			pointer.startY - 90
		);
		game.render.context.fillText(
			'currentX: ' + pointer.currentX + ', currentY: ' + pointer.currentY,
			pointer.startX - 30,
			pointer.startY - 80
		);
		game.render.context.fillText(
			'offsetX: ' + (pointer.currentX - pointer.startX) + ', offsetY: ' + (pointer.currentY - pointer.startY),
			pointer.startX - 30,
			pointer.startY - 70
		);
		game.render.context.restore();
	});
	game.pointers.onContinued('*', '*', function (pointer) {
		game.render.context.save();
		game.render.context.strokeStyle = 'red';
		game.render.context.beginPath();
		game.render.context.moveTo(pointer.startX, pointer.startY);
		game.render.context.lineTo(pointer.currentX, pointer.currentY);
		game.render.context.stroke();
		game.render.context.restore();
	})
	game.pointers.onContinued('*', '*', function (pointer) {
		game.render.context.save();
		game.render.context.strokeStyle = 'red';
		game.render.context.rect(
			pointer.startX,
			pointer.startY,
			pointer.currentX - pointer.startX,
			pointer.currentY - pointer.startY
		);
		game.render.context.stroke();
		game.render.context.restore();
	})
};