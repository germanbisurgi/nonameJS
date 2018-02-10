var fingersState = new noname.state('fingersState');

fingersState.preload = function () {};

fingersState.create = function () {
};

fingersState.update = function () {

	fingersState.keys.justPressed('b', function () {
		fingersState.state.switchPrevious();
	});

	fingersState.keys.justPressed('n', function () {
		fingersState.state.switchNext();
	});
};

fingersState.afterRender = function () {
	fingersState.fingers.tracked.forEach(function (_finger) {
		fingersState.render.context.strokeStyle = 'cyan';
		fingersState.render.context.lineWidth = '6';
		fingersState.render.context.beginPath();
		fingersState.render.context.arc(_finger.startX, _finger.startY, 60, 0, Math.PI * 2, true);
		fingersState.render.context.stroke();
		fingersState.render.context.beginPath();
		fingersState.render.context.arc(_finger.currentX, _finger.currentY, 30, 0, Math.PI * 2, true);
		fingersState.render.context.stroke();
		fingersState.render.context.fillText(
			'id: ' + _finger.id,
			_finger.startX - 30,
			_finger.startY - 100
		);
		fingersState.render.context.fillText(
			'startX: ' + _finger.startX + ', startY: ' + _finger.startY,
			_finger.startX - 30,
			_finger.startY - 90
		);
		fingersState.render.context.fillText(
			'currentX: ' + _finger.currentX + ', currentY: ' + _finger.currentY,
			_finger.startX - 30,
			_finger.startY - 80
		);
		fingersState.render.context.fillText(
			'offsetX: ' + _finger.offsetX + ', offsetY: ' + _finger.offsetY,
			_finger.startX - 30,
			_finger.startY - 70
		);

	});
};
