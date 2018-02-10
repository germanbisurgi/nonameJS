var Track = function (_audioMamaner, _settings) {
	'use strict';
	var self = this;

	self.context = _audioMamaner.context;
	self.audioBuffer = _settings.audioBuffer;
	self.gainNode = self.context.createGain();
	self.lastTime = 0;
	self.playbackTime = 0;
	self.isPlaying = false;

	self.init = function () {
		self.gainNode.connect(self.context.destination);
		if (_settings.volume) {
			self.gainNode.gain.value = _settings.volume;
		}
	};

	self.play = function () {
		if (!self.isPlaying) {
			self.source = self.context.createBufferSource();
			self.source.buffer = self.audioBuffer;
			self.source.onended = function () {
				self.playbackTime = 0;
				self.isPlaying = false;
			};
			self.source.connect(self.gainNode);
			self.source.start(0, self.playbackTime);
			self.onPlay();
			self.isPlaying = true;
			self.lastTime = self.context.currentTime;
		}
	};

	self.volume = function (_volume) {
		if (_volume) {
			self.gainNode.gain.value = _volume;
		}
		self.onVolume();
		return self.gainNode.gain.value;
	};

	self.pause = function () {
		if (self.isPlaying) {
			self.source.stop();
			self.isPlaying = false;
			self.playbackTime = self.context.currentTime - self.lastTime + self.playbackTime;
			self.onPause();
		}
	};

	self.stop = function () {
		if (self.isPlaying) {
			self.source.stop();
			self.isPlaying = false;
			self.playbackTime = 0;
			self.onStop();
		}
	};

	self.seek = function (_seek) {
		self.playbackTime = _seek;
	};

	self.onPlay = function () {
		console.log('onPlay');
	};

	self.onVolume = function () {
		console.log('onVolume');
	};

	self.onPause = function () {
		console.log('onPause');
	};

	self.onStop = function () {
		console.log('onStop');
	};

	self.init();
};
