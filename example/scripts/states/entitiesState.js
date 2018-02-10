var entitiesState = new noname.state('entitiesState');

entitiesState.preload = function () {
	entitiesState.assets.queueImage('stone', 'example/assets/images/stone.png');
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
