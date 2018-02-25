/**
 * Track fingers touching on the canvas element.
 * @param  {object} _game [description]
 * @class Fingers
 */
var Mouse = function (_game) {
	'use strict';
	var self = this;
	self.tracked = [];
	self.justToucing = [];
	self.releasing = [];

	_game.render.canvas.addEventListener('touchstart', function (event) {
		event.preventDefault();
	}, false);

	_game.render.canvas.addEventListener('touchmove', function (event) {
		event.preventDefault();
	}, false);

	_game.render.canvas.addEventListener('touchend', function (event) {
		event.preventDefault();
	}, false);


};
