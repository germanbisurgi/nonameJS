var AudioManager = function (_game) {
	'use strict';
	var self = this;
	self.context = new (window.AudioContext || window.webkitAudioContext)();

	self.init = function () {};

	self.createTrack = function (_settings) {
		return new noname.track(self, _settings);
	};

};
