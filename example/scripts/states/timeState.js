var timeState = new noname.state('timeState');

timeState.preload = function (game) {
	game.loader.queueImage('stone', 'example/assets/images/stone.png');
};

timeState.create = function (game) {

	console.log('timeState');

	/* fast block */
	timeState.fastBlock = new noname.entity();
	timeState.fastBlock.addComponent('transform', new noname.transformComponent(50, 50, 50, 50));
	timeState.fastBlock.addComponent('clock', game.time.masterClock);
	timeState.fastBlock.clock.motion = 1;
	timeState.fastBlock.addComponent('renderable', new noname.imageComponent(game.loader.get('stone')));
	game.entities.add(timeState.fastBlock);

	/* slow block */
	timeState.slowBlock = new noname.entity();
	timeState.slowBlock.addComponent('transform', new noname.transformComponent(50, 150, 50, 50));
	timeState.slowBlock.addComponent('clock', game.time.create());
	timeState.slowBlock.clock.motion = 0.5;
	timeState.slowBlock.addComponent('renderable', new noname.imageComponent(game.loader.get('stone')));
	game.entities.add(timeState.slowBlock);

};

timeState.update = function () {

	// rotates 90 degrees * motion (1.0) per second = 90 degrees per second
	timeState.fastBlock.transform.rotate(90);

	// rotates 90 degrees * motion (0.5) per second = 45 degrees per second.
	timeState.slowBlock.transform.rotate(90);

	game.keys.justPressed('b', function () {
		game.state.switchPrevious();
	});

	game.keys.justPressed('n', function () {
		game.state.switchNext();
	});
};

