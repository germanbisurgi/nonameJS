var AudioManager = function (_game) {
	'use strict';
	var self = this;
	self.context = new (window.AudioContext || window.webkitAudioContext)();
	self.masterGain = self.context.createGain();

	self.init = function () {
		self.masterGain.connect(self.context.destination);
	};

	// https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start
	self.play = function (_buffer, _time) {
		var source = self.context.createBufferSource();
		source.buffer = _buffer;
		source.connect(self.masterGain);
		self.masterGain.connect(self.context.destination);
		source.start(_time);
	};
};
