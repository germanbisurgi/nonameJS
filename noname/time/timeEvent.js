var TimeEvent = function (_function, _milliseconds, _context, _once) {
	'use strict';
	var self = this;
	self.interval = _milliseconds;
	self.function = _function;
	self.elapsed = 0;
	self.lastElapsed = 0;
	self.once = _once;

	self.init = function () {
		if (self.function) {
			self.function.bind(_context);
		}
	};

	self.init();
};
