var pointersState = new noname.state('pointersState');

pointersState.preload = function (game) {};

pointersState.create = function (game) {};

pointersState.update = function (game) {

	game.debugger.print(game.pointers, 2)


	game.pointers.onStart('*', '*', function (pointers) {
		console.log('start');
	});

	game.pointers.onContinued('*', '*', function (pointers) {
		console.log('continued');
	});

	game.pointers.onEnd('*', '*', function (pointers) {
		console.log('end');
	});

	game.keys.justPressed('b', function () {
		game.state.switchPrevious();
	});

	game.keys.justPressed('n', function () {
		game.state.switchNext();
	});

};

pointersState.afterRender = function (game) {
	game.pointers.continued.forEach(function (pointer) {
		game.render.context.strokeStyle = pointer.type === 'mouse' ? 'magenta' : 'cyan';
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
	});
};
