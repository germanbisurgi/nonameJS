/**
 * Is an abstraction of the web audio api and eases the creations and utilization
 * of sounds.
 * @param  {object} _game a reference to the game.
 * @class Audio
 */
var Audio = function (_game) {
	'use strict';
	var self = this;

	self.unlocked = false;

	/**
	 * The audio context.
	 * @property context
	 * @type {Object}
	 */
	self.context = new (window.AudioContext || window.webkitAudioContext)();

	/**
	 * Creates a new Track.
	 * @method createTrack
	 * @params {Object} _settings A settings object to set initial values of the track.
	 * @return {Track}
	 */
	self.createTrack = function (_settings) {
		return new noname.track(self, _settings);
	};

	self.init = function () {
		document.body.addEventListener('touchstart', self.touchStartHandler, false);
	};

	self.touchStartHandler = function () {
		if (!self.unlocked) {
			var buffer = self.context.createBuffer(1, 1, 22050);
			var source = self.context.createBufferSource();
			source.buffer = buffer;
			source.connect(self.context.destination);
			source.start(0);
			setTimeout(function () {
				if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
					self.unlocked = true;
				}
			}, 0);
		}
	};

	self.init();

};
