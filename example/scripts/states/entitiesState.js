var entitiesState = new noname.state('entitiesState');

entitiesState.preload = function (game) {
	game.loader.queueImage('stone', 'example/assets/images/stone.png');

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
		setTimeout(function () {
			loading.setAttribute('style', 'display: none;');
		}, 1000);
	});
};

entitiesState.create = function (game) {
	var self = entitiesState;

	self.body = game.world.addBody(100, 100, 'dynamic');
	self.body.addRectangle(50, 50);
	self.body.addRectangle(50, 50, 100, 50);
	self.body.addImage(game.loader.get('stone'), 50, 50, 100, 50);
	self.body.addImage(game.loader.get('stone'), 50, 50, 0, 0);

	console.log(self.body)

};

entitiesState.update = function (game) {
	var self = entitiesState;

	self.body.setVelocity(0,0);
	self.body.SetAngularVelocity(1);

	game.keys.pressing('ArrowRight', function () {
		self.body.setVelocity(100,0);
	});

	game.keys.justPressed('b', function () {
		game.state.switchPrevious();
	});

	game.keys.justPressed('n', function () {
		game.state.switchNext();
	});
};
