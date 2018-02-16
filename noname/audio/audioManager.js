/**
 * Is an abstraction of the web audio api and eases the creations and utilization
 * of sounds.
 * @param  {object} _game a reference to the game.
 * @class AudioManager
 */
var AudioManager = function (_game) {
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

};
