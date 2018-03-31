/**
* Loads and cache game assets like images and audio.
* @class Loader
*/
var Loader = function (_game) {
	'use strict';
	var self = this;

	/**
	* Is true if the asset manager is loading assets otherwise is false.
	* @property loading
	* @type {Boolean}
	*/
	self.loading = false;

	/**
	* An array of assets that were queued in the preload phase.
	* @property queue
	* @type {Array}
	*/
	self.queue = [];

	/**
	* assets loading errors count.
	* @property success
	* @type {Number}
	*/
	self.success = 0;

	/**
	* assets loading errors count.
	* @property errors
	* @type {Number}
	*/
	self.errors = 0;

	/**
	* The name of the latest loaded asset.
	* @property lastLoaded
	* @type {String}
	*/
	self.lastLoaded = null;

	/**
	* The array holding all the assets of the game.
	* @property cache
	* @type {Array}
	*/
	self.cache = [];

	self.audioContext = new (window.AudioContext || window.webkitAudioContext)();

	self.reset = function () {
		self.queue = [];
		self.success = 0;
		self.errors = 0;
	};

	/**
	 * Queue an audio file to be loaded when the loadAll() method will be called.
	 * @method queueAudio
	 * @param  {string} _name The asset name ('shot')
	 * @param  {string} _path The path of the asset (asset/path/shot.wav)
	 */
	self.queueAudio = function (_name, _path) {
		self.queue.push({
			type: 'audio',
			name: _name,
			path: _path
		});
	};

	/**
	 * Queue an image file to be loaded when the loadAll() method will be called.
	 * @method queueImage
	 * @param  {string} _name The asset name ('player')
	 * @param  {string} _path The path of the asset (asset/path/player.png)
	 */
	self.queueImage = function (_name, _path) {
		self.queue.push({
			type: 'image',
			name: _name,
			path: _path
		});
	};

	/**
	 * Retrieves an asset from the assetManager pool.
	 * @method get
	 * @param  {String} _name The name of the asset to be retrieved.
	 * @return {Object} asset A game asset like an Image or an Audio file.
	 */
	self.get = function (_name) {
		var output = false;
		self.cache.forEach(function (_asset) {
			if (_asset.name === _name) {
				output = _asset;
			}
		});
		return output;
	};

	self.loadAll = function () {
		if (self.queue.length > 0) {
			self.queue.forEach(function (_asset) {
				if (self.get(_asset.name)) {
					console.log('Asset already loaded ->', _asset.name);
					self.success++;
					if (self.loadComplete()) {
						self.loading = false;
						self.reset();
						_game.messages.send('done');
					}
				} else {
					_game.messages.send('loading');
					self.loading = true;
					if (_asset.type === 'image') {
						self.loadImage(_asset);
					}
					if (_asset.type === 'audio') {
						self.loadAudio(_asset);
					}
				}
			});
		}
	};

	self.loadImage = function (_asset) {
		var img = new Image();
		img.onload = function () {
			self.lastLoaded = _asset.name;
			self.success++;
			_game.messages.send('onload', img);
			if (self.loadComplete()) {
				self.loading = false;
				self.reset();
				_game.messages.send('done');
			}
		};
		img.onerror = function () {
			self.errors++;
			_game.messages.send('onerror', img);
			if (self.loadComplete()) {
				self.loading = false;
				self.reset();
				_game.messages.send('done');
			}
		};
		img.src = _asset.path;
		img.name = _asset.name;
		self.cache.push(img);
	};

	self.loadAudio = function (_asset) {
		var request = new XMLHttpRequest();
		var audio = null;
		request.open('GET', _asset.path, true);
		request.responseType = 'arraybuffer';
		request.onload = function () {
			self.audioContext.decodeAudioData(request.response, function (buffer) {
				audio = buffer;
				audio.name = _asset.name;
				self.lastLoaded = _asset.name;
				self.cache.push(audio);
				self.success++;
				_game.messages.send('onload', audio);
				if (self.loadComplete()) {
					self.loading = false;
					self.reset();
					_game.messages.send('done');
				}
			}, function () {
				self.errors++;
				_game.messages.send('onerror', audio);
				if (self.loadComplete()) {
					self.loading = false;
					self.reset();
					_game.messages.send('done', audio);
				}
			});
		};
		request.send();

	};

	/**
	 * Returns the loading progress in percent.
	 * @method progress
	 * @return {number} progress The loading progress in percent.
	 */
	self.progress = function () {
		var progress = Math.floor((self.success + self.errors) / self.queue.length * 100);
		if (isNaN(progress)) {
			progress = 100;
		}
		return progress;
	};

	/**
	 * Returns true if all assets were loaded.
	 * @method loadComplete
	 * @return {boolean} boolean Is true if all assets were loaded.
	 */
	self.loadComplete = function () {
		return self.queue.length === self.success + self.errors;
	};

};
