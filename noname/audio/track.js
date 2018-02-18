/**
 * Is an abstraction of the web audio api and eases the creations and utilization
 * of sounds.
 * @param  {object} _audioMamaner The audio context this track belong to.
 * @param  {object} _settings A settings object to set initial values of the track.
 * @class Track
 */
var Track = function (_audioMamaner, _settings) {
	'use strict';
	var self = this;

	/**
	 * The audio context this track belong to.
	 * @property context
	 * @type {Object}
	 */
	self.context = _audioMamaner.context;

	/**
	 * Web audio buffer objects.
	 * @property audioBuffer
	 * @type {Object}
	 */
	self.audioBuffer = _settings.audioBuffer;

	/**
	 * Web audio gain node used to set the track volume.
	 * @property gainNode
	 * @type {Object}
	 */
	self.gainNode = self.context.createGain();

	/**
	 * Web audio gain node used to set the track volume.
	 * @property lastTime
	 * @type {Number}
	 */
	self.playbackTime = 0;

	/**
	 * A boolean tha says if the Track is being played or not.
	 * @property isPlaying
	 * @type {Bollean}
	 */
	self.isPlaying = false;

	self.lastTime = 0;

	self.init = function () {
		self.gainNode.connect(self.context.destination);
		if (_settings.volume) {
			self.gainNode.gain.value = _settings.volume;
		}
	};

	/**
	 * Play the Track. Triggers the onPlay method.
	 * @method play
	 */
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

	/**
	 * Get/set the volume of the specific Track, from 0.0 to 1.0. Triggers the onVolume method.
	 * @method volume
	 */
	self.volume = function (_volume) {
		if (_volume) {
			self.gainNode.gain.value = _volume;
		}
		self.onVolume();
		return self.gainNode.gain.value;
	};

	/**
	 * Pauses the Track, saving the seek of playback. Triggers the onPause method.
	 * @method pause
	 */
	self.pause = function () {
		if (self.isPlaying) {
			self.source.stop();
			self.isPlaying = false;
			self.playbackTime = self.context.currentTime - self.lastTime + self.playbackTime;
			self.onPause();
		}
	};

	/**
	 * Stops the Track resetting seek to 0. Triggers the onStop method.
	 * @method stop
	 */
	self.stop = function () {
		if (self.isPlaying) {
			self.source.stop();
			self.isPlaying = false;
			self.playbackTime = 0;
			self.onStop();
		}
	};

	/**
	 * Get/set the position of playback for a Track. Triggers the onSeek method.
	 * @params {Number} _seek The position to move current playback to (in seconds).
	 * @method seek
	 */
	self.seek = function (_seek) {
		if (_seek < 0) {
			return false;
		}
		self.playbackTime = _seek;
	};

	/**
	 * Fires when the sound begins playing.
	 * @method onPlay
	 */
	self.onPlay = function () {
		// console.log('onPlay');
	};

	/**
	 * Fires when the sound's volume has changed.
	 * @method onVolume
	 */
	self.onVolume = function () {
		// console.log('onVolume');
	};

	/**
	 * Fires when the sound has been paused.
	 * @method onPause
	 */
	self.onPause = function () {
		// console.log('onPause');
	};

	/**
	 * Fires when the sound has been stopped.
	 * @method onStop
	 */
	self.onStop = function () {
		// console.log('onStop');
	};

	self.init();
};
