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

	/* entity */
	entitiesState.myEntity = new noname.entity();
	entitiesState.myEntity.addComponent('transform', new noname.transformComponent(50, 50, 50, 50));
	entitiesState.myEntity.addComponent('clock', game.time.masterClock);
	entitiesState.myEntity.addComponent('renderable', new noname.imageComponent(game.loader.get('stone')));
	game.entities.add(entitiesState.myEntity);

};

entitiesState.update = function (game) {
	game.keys.justPressed('b', function () {
		game.state.switchPrevious();
	});

	game.keys.justPressed('n', function () {
		game.state.switchNext();
	});
};
