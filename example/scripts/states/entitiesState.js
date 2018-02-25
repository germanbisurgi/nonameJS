var entitiesState = new noname.state('entitiesState');

entitiesState.preload = function () {
	entitiesState.assets.queueImage('stone', 'example/assets/images/stone.png');

	var loading = document.querySelector('.loading');
	var asset = document.querySelector('.loading-asset');
	var progress = document.querySelector('.loading-progress');

	audioState.assets.pubsub.subscribe('loading', function () {
		loading.setAttribute('style', 'display: block;');
	});

	audioState.assets.pubsub.subscribe('onload', function (_data) {
		asset.innerText = 'loading: ' + _data.name;
		progress.setAttribute('style', 'width: ' + audioState.assets.progress() + '%;');
	});

	audioState.assets.pubsub.subscribe('done', function () {
		asset.innerText = 'loading: DONE';
		setTimeout(function () {
			loading.setAttribute('style', 'display: none;');
		}, 1000);
	});
};

entitiesState.create = function () {

	/* entity */
	entitiesState.myEntity = new noname.entity();
	entitiesState.myEntity.addComponent('transform', new noname.transformComponent(50, 50, 50, 50));
	entitiesState.myEntity.addComponent('clock', entitiesState.time.masterClock);
	entitiesState.myEntity.addComponent('renderable', new noname.imageComponent(entitiesState.assets.get('stone')));
	entitiesState.entities.add(entitiesState.myEntity);

};

entitiesState.update = function () {
	entitiesState.keys.justPressed('b', function () {
		entitiesState.state.switchPrevious();
	});

	entitiesState.keys.justPressed('n', function () {
		entitiesState.state.switchNext();
	});
};
