var clocksState = new noname.state('clocksState');

clocksState.preload = function () {
	clocksState.assets.queueImage('stone', 'example/assets/images/stone.png');
};

clocksState.create = function () {

	/* fast block */
	clocksState.fastBlock = new noname.entity();
	clocksState.fastBlock.addComponent('transform', new noname.transformComponent(50, 50, 50, 50));
	clocksState.fastBlock.addComponent('clock', clocksState.clock.master);
	clocksState.fastBlock.clock.motion = 1;
	clocksState.fastBlock.addComponent('renderable', new noname.imageComponent(clocksState.assets.get('stone')));
	clocksState.entities.add(clocksState.fastBlock);

	/* slow block */
	clocksState.slowBlock = new noname.entity();
	clocksState.slowBlock.addComponent('transform', new noname.transformComponent(50, 150, 50, 50));
	clocksState.slowBlock.addComponent('clock', clocksState.clock.master);

	clocksState.slowBlock.addComponent('clock', clocksState.clock.create());
	clocksState.slowBlock.clock.motion = 0.5;

	clocksState.slowBlock.addComponent('renderable', new noname.imageComponent(clocksState.assets.get('stone')));
	clocksState.entities.add(clocksState.slowBlock);

};

clocksState.update = function () {

	console.log(
		clocksState.fastBlock.clock.elapsed,
		clocksState.slowBlock.clock.elapsed
	);

	// rotates 90 degrees * motion (1.0) per second = 90 degrees per second
	clocksState.fastBlock.transform.rotate(90);

	// rotates 90 degrees * motion (0.5) per second = 45 degrees per second.
	clocksState.slowBlock.transform.rotate(90);
};
