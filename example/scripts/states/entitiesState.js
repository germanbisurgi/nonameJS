var entitiesState = new noname.state('entitiesState');

entitiesState.preload = function (game) {
	game.loader.queueImage('stone', 'example/assets/images/stone.png');
	game.loader.queueImage('humstar', 'example/assets/images/humstar.png');
	game.loader.queueImage('block', 'example/assets/images/block.png');
	game.loader.queueAudio('kick', 'example/assets/audio/kick.wav');

	var loading = document.querySelector('.loading');
	var asset = document.querySelector('.loading-asset');
	var progress = document.querySelector('.loading-progress');

	game.loader.pubsub.subscribe('loading', function () {
		loading.setAttribute('style', 'display: block;');
	});

	game.loader.pubsub.subscribe('onload', function (_data) {
		asset.innerText = 'loading: ' + _data.name;
		progress.setAttribute('style', 'width: ' + game.loader.progress() + '%;');
	});

	game.loader.pubsub.subscribe('done', function () {
		asset.innerText = 'loading: DONE';
		loading.setAttribute('style', 'display: none;');
	});
};

entitiesState.create = function (game) {
	var self = entitiesState;

	self.kick = game.audio.createTrack({
		audioBuffer: game.loader.get('kick'),
		volume: 1.0
	});

	// gravity
	// game.world.setGravity(0, 9.8);

	// block factory
	var addBlock = function (x, y) {
		var block = game.world.addBody(x, y, 'dynamic');
		block.addRectangle(0, 0, 50, 50);
		block.addImage(game.loader.get('block'), 0, 0, 50, 50);
	};

	// blocks
	addBlock(180, 100);
	addBlock(100, 200);
	addBlock(200, 400);
	addBlock(400, 300);
	addBlock(500, 300);
	addBlock(440, 100);
	addBlock(500, 500);
	addBlock(600, 200);

	// static edges (bench)
	self.edges = game.world.addBody(10, 10, 'static');
	self.edges.addEdge(0, 0, window.innerWidth - 20, 0);
	self.edges.addEdge(window.innerWidth - 20, 0, window.innerWidth - 20, window.innerHeight -20);
	self.edges.addEdge(window.innerWidth - 20, window.innerHeight - 20, 0, window.innerHeight - 20);
	self.edges.addEdge(0, window.innerHeight - 20, 0, 0);

	// humstar
	self.humstar = game.world.addBody(250, 100, 'dynamic', {});
	self.humstarCircle = self.humstar.addCircle(0, 0, 25);
	self.sensorL = self.humstar.addCircle(-25, 0, 10, {isSensor: true, density: 0});
	self.sensorR = self.humstar.addCircle(25, 0, 10, {isSensor: true, density: 0});
	self.sensorT = self.humstar.addRectangle(0, -25, 20, 20, {isSensor: true, density: 0});
	self.sensorB = self.humstar.addRectangle(0, 25, 20, 20, {isSensor: true, density: 0});

	self.humstarSprite = self.humstar.addSprite(game.loader.get('humstar'), 0, 0, 50, 50, 32, 32);
	self.humstarSprite.addAnimation('fly', [0, 1, 2, 3, 4]);

	self.data = {};

	// world contacts
	game.world.contacts.BeginContact = function (contact) {
		self.data.leftTouching = contact.GetFixtureA() === self.sensorL || contact.GetFixtureB() === self.sensorL;
		self.data.topTouching = contact.GetFixtureA() === self.sensorT || contact.GetFixtureB() === self.sensorT;
		self.data.rightTouching = contact.GetFixtureA() === self.sensorR || contact.GetFixtureB() === self.sensorR;
		self.data.bottomTouching = contact.GetFixtureA() === self.sensorB || contact.GetFixtureB() === self.sensorB;
		if (contact.GetFixtureA() === self.humstarCircle || contact.GetFixtureB() === self.humstarCircle) {
			self.kick.play();
		}
	}

};

entitiesState.update = function (game) {
	var self = entitiesState;

	// game.debugger.print(game.world, 1);

	// play humstar animation
	self.humstarSprite.play('fly', 100);

	// controls
	game.keys.pressing('ArrowRight', function () {
		// self.humstar.setVelocity(100, 0);
		self.humstar.ApplyForce({x: 2, y: 0}, self.humstar.GetWorldCenter());
	});
	game.keys.pressing('ArrowLeft', function () {
		// self.humstar.setVelocity(-100, 0);
		self.humstar.ApplyForce({x: -2, y: 0}, self.humstar.GetWorldCenter());
	});
	game.keys.pressing('ArrowUp', function () {
		// self.humstar.setVelocity(0 ,-100);
		self.humstar.ApplyForce({x: 0, y: -2}, self.humstar.GetWorldCenter());
	});
	game.keys.pressing('ArrowDown', function () {
		// self.humstar.setVelocity(0 ,100);
		self.humstar.ApplyForce({x: 0, y: 2}, self.humstar.GetWorldCenter());
	});

	// touch drag
	game.fingers.justTouched(1, function (finger) {
		game.world.dragStart({x: finger.currentX, y: finger.currentY});
	});
	game.fingers.touching(1, function (finger) {
		game.world.dragMove({x: finger.currentX, y: finger.currentY});
	});
	game.fingers.released(1, function () {
		game.world.dragEnd();
	});

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
