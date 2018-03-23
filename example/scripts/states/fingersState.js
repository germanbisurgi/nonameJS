var fingersState = new noname.state('fingersState');

fingersState.preload = function (game) {};

fingersState.create = function (game) {};

fingersState.update = function (game) {

	game.fingers.justTouched(1, function (_finger) {
		console.log('just touched');
	});

	game.fingers.touching(1, function (_finger) {
		console.log('touching');
	});

	game.fingers.released(1, function (_finger) {
		console.log('released');
	});

	game.keys.justPressed('b', function () {
		game.state.switchPrevious();
	});

	game.keys.justPressed('n', function () {
		game.state.switchNext();
	});

};

fingersState.afterRender = function (game) {
	game.fingers.tracked.forEach(function (_finger) {
		game.render.context.strokeStyle = 'cyan';
		game.render.context.lineWidth = '6';
		game.render.context.beginPath();
		game.render.context.arc(_finger.startX, _finger.startY, 60, 0, Math.PI * 2, true);
		game.render.context.stroke();
		game.render.context.beginPath();
		game.render.context.arc(_finger.currentX, _finger.currentY, 30, 0, Math.PI * 2, true);
		game.render.context.stroke();
		game.render.context.fillText(
			'number: ' + _finger.number,
			_finger.startX - 30,
			_finger.startY - 100
		);
		game.render.context.fillText(
			'startX: ' + _finger.startX + ', startY: ' + _finger.startY,
			_finger.startX - 30,
			_finger.startY - 90
		);
		game.render.context.fillText(
			'currentX: ' + _finger.currentX + ', currentY: ' + _finger.currentY,
			_finger.startX - 30,
			_finger.startY - 80
		);
		game.render.context.fillText(
			'offsetX: ' + _finger.offsetX + ', offsetY: ' + _finger.offsetY,
			_finger.startX - 30,
			_finger.startY - 70
		);
	});
};
