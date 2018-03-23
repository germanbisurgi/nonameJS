var mouseState = new noname.state('mouseState');

mouseState.create = function (game) {};

mouseState.update = function (game) {

	game.mouse.justPressed(0, function (_button) {
		// console.log('justPressed', _button);
	});

	game.mouse.pressing(0, function (_button) {
		// console.log('pressing', _button);
	});

	game.mouse.released(0, function (_button) {
		// console.log('released', _button);
	});

	game.keys.justPressed('b', function () {
		game.state.switchPrevious();
	});

	game.keys.justPressed('n', function () {
		game.state.switchNext();
	});

};

mouseState.afterRender = function (game) {
	game.mouse.tracked.forEach(function (_button) {
		game.render.context.strokeStyle = 'cyan';
		game.render.context.lineWidth = '6';
		game.render.context.beginPath();
		game.render.context.arc(_button.startX, _button.startY, 60, 0, Math.PI * 2, true);
		game.render.context.stroke();
		game.render.context.beginPath();
		game.render.context.arc(_button.currentX, _button.currentY, 30, 0, Math.PI * 2, true);
		game.render.context.stroke();
		game.render.context.fillText(
			'number: ' + _button.number,
			_button.startX - 30,
			_button.startY - 100
		);
		game.render.context.fillText(
			'startX: ' + _button.startX + ', startY: ' + _button.startY,
			_button.startX - 30,
			_button.startY - 90
		);
		game.render.context.fillText(
			'currentX: ' + _button.currentX + ', currentY: ' + _button.currentY,
			_button.startX - 30,
			_button.startY - 80
		);
		game.render.context.fillText(
			'offsetX: ' + _button.offsetX + ', offsetY: ' + _button.offsetY,
			_button.startX - 30,
			_button.startY - 70
		);
	});
};
