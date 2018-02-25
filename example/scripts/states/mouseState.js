var mouseState = new noname.state('mouseState');

mouseState.create = function () {};

mouseState.update = function () {

	mouseState.mouse.justPressed(0, function (_button) {
		// console.log('justPressed', _button);
	});

	mouseState.mouse.pressing(0, function (_button) {
		// console.log('pressing', _button);
	});

	mouseState.mouse.released(0, function (_button) {
		// console.log('released', _button);
	});

	mouseState.keys.justPressed('b', function () {
		mouseState.state.switchPrevious();
	});

	mouseState.keys.justPressed('n', function () {
		mouseState.state.switchNext();
	});

};

mouseState.afterRender = function () {
	mouseState.mouse.tracked.forEach(function (_button) {
		mouseState.render.context.strokeStyle = 'cyan';
		mouseState.render.context.lineWidth = '6';
		mouseState.render.context.beginPath();
		mouseState.render.context.arc(_button.startX, _button.startY, 60, 0, Math.PI * 2, true);
		mouseState.render.context.stroke();
		mouseState.render.context.beginPath();
		mouseState.render.context.arc(_button.currentX, _button.currentY, 30, 0, Math.PI * 2, true);
		mouseState.render.context.stroke();
		mouseState.render.context.fillText(
			'number: ' + _button.number,
			_button.startX - 30,
			_button.startY - 100
		);
		mouseState.render.context.fillText(
			'startX: ' + _button.startX + ', startY: ' + _button.startY,
			_button.startX - 30,
			_button.startY - 90
		);
		mouseState.render.context.fillText(
			'currentX: ' + _button.currentX + ', currentY: ' + _button.currentY,
			_button.startX - 30,
			_button.startY - 80
		);
		mouseState.render.context.fillText(
			'offsetX: ' + _button.offsetX + ', offsetY: ' + _button.offsetY,
			_button.startX - 30,
			_button.startY - 70
		);
	});
};