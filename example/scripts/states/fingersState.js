var fingersState = new noname.state('fingersState');

fingersState.preload = function () {};

fingersState.create = function () {};

fingersState.update = function () {


	fingersState.fingers.justTouched(0, function (_finger) {
		console.log('just touched', _finger);
	});

	fingersState.fingers.touching(0, function (_finger) {
		//console.log('touching', _finger);
	});

	fingersState.fingers.released(0, function (_finger) {
		console.log('released', _finger);
	});

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
			'number: ' + _finger.number,
			_finger.startX - 30,
			_finger.startY - 100
		);
		fingersState.render.context.fillText(
			'startX: ' + Math.floor(_finger.startX) + ', startY: ' + Math.floor(_finger.startY),
			_finger.startX - 30,
			_finger.startY - 90
		);
		fingersState.render.context.fillText(
			'currentX: ' + Math.floor(_finger.currentX) + ', currentY: ' + Math.floor(_finger.currentY),
			_finger.startX - 30,
			_finger.startY - 80
		);
		fingersState.render.context.fillText(
			'offsetX: ' + Math.floor(_finger.offsetX) + ', offsetY: ' + Math.floor(_finger.offsetY),
			_finger.startX - 30,
			_finger.startY - 70
		);
	});
};
