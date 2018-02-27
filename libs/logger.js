var Logger = function (_outputContainer) {
	'use strict';
	var self = this;

	self.depth = 1;
	self.maxDepth = 5;
	self.path = [];
	self.output = '';
	self.outputContainer = _outputContainer;
	self.paths = [];
	self.circularPaths= [];
	self.seen = [];

	self.init = function () {
		self.walk(function (_key, _value, _path) {
			self.paths.push(_path.join('.'));
		});
	};

	self.goDeeper = function () {
		self.maxDepth++;
	};

	self.goShallower = function () {
		self.maxDepth--;
		if (self.maxDepth < 1) {
			self.maxDepth = 1;
		}
	};

	// executes a function for every node. Function (key, value, path, depth) {}
	self.walk = function (_object, _function) {
		self.seen = [];
		self.recursive(_object, _function);
	};

	self.recursive = function (_object, _function, _circular) {

		if (typeof _circular === 'undefined') {
			_circular = false;
		}

		for (var _property in _object) {
			if (_object.hasOwnProperty(_property)) {

				// build path
				var diff = self.path.length - self.depth;
				for (var i = 0; i < diff; i++) {
					self.path.pop();
				}
				self.path[self.depth - 1] = _property;

				// exec function
				_function(_property, _object[_property], self.path, self.depth, _circular);

				// go deeper if allowed
				if (self.depth < self.maxDepth && self.isIterable(_object[_property]) && !_circular) {

					var alreadySeen = self.alreadySeen(_object[_property]);

					if (!alreadySeen) {
						self.seen.push({
							value: _object[_property],
							depth: self.depth
						});
					}

					// if parent path is === to child
					if (alreadySeen.depth === self.depth - 1) {
						// is circular
						alreadySeen.depth = self.depth;
						self.circularPaths.push(self.path.join('.'));
						self.depth++;
						self.recursive(_object[_property], _function, true);
						self.depth--;
					} else {
						// is not circular
						self.depth++;
						self.recursive(_object[_property], _function, false);
						self.depth--;
					}
				}
			}
		}
	};

	// get the value of a node
	self.get = function (_object, _wantedPath) {
		var output = 'NOTHING';
		self.walk(_object, function (_key, _value, _path) {
			if (_path.join('.') === _wantedPath) {
				output = _value;
			}
		});
		return output;
	};

	// set the value of a node. Will create intermediate object/arrays
	self.set = function (_object, _path, _value) {
		// a reference is needed to not override original object.
		var object = _object;
		_path = _path.split('.');
		var pathLength = _path.length;
		_path.forEach(function (_key, _i) {
			// are we at the end of the path?
			if (_i === (pathLength - 1)) {
				object[_key] = _value;
			} else if (object.hasOwnProperty(_key)) {
				object = object[_key];
			} else {
				// else create object or and array.
				object[_key] = (/^\d+$/).test(_path[_i + 1]) ? [] : {};
				// enter it.
				object = object[_key];
			}
		});
	};

	self.print = function (_object) {

		self.output = '';
		var lastDepth = 1;
		var lastIterable = null;

		self.output += '<span class="logger-value">';
		self.output += self.isArray(_object) ? ' [' : ' {';
		self.output += '</span>';

		self.walk(_object, function (_key, _value, _path, _depth, _circular) {

			if (lastDepth > _depth) {
				self.output += '<p class="logger-value" style="padding-left: ' + _depth * 30 + 'px;">';
				self.output += self.isArray(lastIterable) ? ']' : '}';
				self.output += '</p>';
			}

			self.output += '<p style="padding-left: ' + _depth * 30 + 'px;">';

			if (self.isIterable(_value)) {
				self.output += '<span class="logger-key">' + _key + ': ' + '</span>';
				self.output += '<span class="logger-value">';
				self.output += self.printIterables(_value, _circular);
				if (!_circular) {
					self.output += self.isArray(_value) ? ' [' : ' {';
				}
				if (_depth === self.maxDepth) {
					self.output += self.isArray(_value) ? ']' : '}';
				}
				self.output += '</span>';
				lastIterable = _value;
			} else {
				self.output += '<span class="logger-key">' + _key + ': ' + '</span>';
				self.output += '<span class="logger-value">' + self.printNonIterables(_value) + '</span>';
			}

			self.output += '</p>';

			if (_path.join('.') === self.paths[self.paths.length - 1]) {
				self.output += '<p class="logger-value" style="padding-left: 30px;">';
				self.output += self.isArray(_value) ? ']' : '}';
				self.output += '</p>';
			}

			lastDepth = _depth;
		});

		self.output += '<span class="logger-value">';
		self.output += self.isArray(_object) ? ']' : '}';
		self.output += '</span>';

		self.outputContainer.innerHTML = self.output;
	};

	self.printIterables = function (_value, _circular) {
		if (_circular) {
			return '[' + _value.constructor.name + ']';
		} else {
			return _value.constructor.name;

		}
	};

	self.printNonIterables = function (_value) {

		if (_value === null) {
			return 'null';
		}

		if (typeof _value === 'undefined') {
			return _value;
		}

		if (typeof _value === 'boolean') {
			return _value;
		}

		if (typeof _value === 'string') {
			return '"' + _value + '"';
		}

		if (typeof _value === 'number' && !isNaN(_value)) {
			return _value;
		}

		if (self.isObject(_value) && _value.constructor.name === 'RegExp') {
			return 'RegExp';
		}

		if (self.isObject(_value) && _value.constructor.name === 'Date') {
			return _value;
		}

		if (self.isObject(_value) && _value.constructor.name === 'Promise') {
			return 'Promise';
		}

		if (typeof _value === 'function') {
			return 'function ()';
		} else {
			return _value;
		}

	};

	self.isIterable = function (_value) {
		return typeof _value === 'object' &&
			_value !== null &&
			_value.constructor.name !== 'Date' &&
			_value.constructor.name !== 'RegExp' &&
			_value.constructor.name !== 'Promise';
	};

	self.isObject = function (_value) {
		return typeof _value === 'object' && _value !== null;
	};

	self.isArray = function (_value) {
		return {}.toString.call(_value) === '[object Array]';
	};

	self.inArray = function (_value, _array) {
		return _array.indexOf(_value) !== -1;
	};

	self.alreadySeen= function (_value) {
		var output = false;
		self.seen.forEach(function (_seen) {
			if (_seen.value === _value) {
				output = _seen;
			}
		});
		return output;
	};

	self.init();

};
