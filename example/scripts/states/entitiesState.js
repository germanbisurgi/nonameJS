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

	// blocks
	self.block = game.world.addBody(180, 100, 'dynamic');
	self.block.addRectangle(0, 0, 50, 50);
	self.block.addImage(game.loader.get('block'), 0, 0, 50, 50);

	self.block = game.world.addBody(100, 200, 'dynamic');
	self.block.addRectangle(0, 0, 50, 50);
	self.block.addImage(game.loader.get('block'), 0, 0, 50, 50);

	self.block = game.world.addBody(440, 100, 'dynamic');
	self.block.addRectangle(0, 0, 50, 50);
	self.block.addImage(game.loader.get('block'), 0, 0, 50, 50);

	// static edges (bench)
	self.edges = game.world.addBody(10, 10, 'static');
	self.edges.addEdge(0, 0, window.innerWidth - 20, 0);
	self.edges.addEdge(window.innerWidth - 20, 0, window.innerWidth - 20, window.innerHeight -20);
	self.edges.addEdge(window.innerWidth - 20, window.innerHeight - 20, 0, window.innerHeight - 20);
	self.edges.addEdge(0, window.innerHeight - 20, 0, 0);

	// a body with multiple fixtures
	self.body = game.world.addBody(250, 100, 'dynamic');
	self.humstarCircle = self.body.addCircle(0, 0, 25);
	self.sensorL = self.body.addCircle(-25, 0, 10, {isSensor: true, density: 0});
	self.sensorR = self.body.addCircle(25, 0, 10, {isSensor: true, density: 0});
	self.sensorT = self.body.addRectangle(0, -25, 20, 20, {isSensor: true, density: 0});
	self.sensorB = self.body.addRectangle(0, 25, 20, 20, {isSensor: true, density: 0});

	self.body.addSprite(game.loader.get('humstar'), 0, 0, 50, 50, 32, 32);

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

	game.debugger.print(self.data);

	// self.body.ApplyForce({x: 0, y: -9.8 * self.body.GetMass()}, self.body.GetWorldCenter());
	// self.body.ApplyTorque(1 / 30);

	// controls
	game.keys.pressing('ArrowRight', function () {
		// self.body.setVelocity(100, 0);
		self.body.ApplyForce({x: 1, y: 0}, self.body.GetWorldCenter());
	});
	game.keys.pressing('ArrowLeft', function () {
		// self.body.setVelocity(-100, 0);
		self.body.ApplyForce({x: -1, y: 0}, self.body.GetWorldCenter());
	});
	game.keys.pressing('ArrowUp', function () {
		// self.body.setVelocity(0 ,-100);
		self.body.ApplyForce({x: 0, y: -1}, self.body.GetWorldCenter());
	});
	game.keys.pressing('ArrowDown', function () {
		// self.body.setVelocity(0 ,100);
		self.body.ApplyForce({x: 0, y: 1}, self.body.GetWorldCenter());
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
