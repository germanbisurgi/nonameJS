var Logger = function (_container) {
	'use strict';
	var self = this;
	self.container = _container;
	self.output = '';
	self.depth = 1;
	self.maxDepth = 1;
	self.path = '';
	self.arguments = null;

	self.log = function () {
		self.arguments = arguments;
		self.exec();
	};

	self.refresh = function () {
		self.exec();
	};

	self.exec = function () {
		self.container.innerHTML = '';
		self.output = '';
		for (var i = 0; i < self.arguments.length; i++) {
			var value = self.arguments[i];
			self.recursiveFunction(value, true);
		}
		self.container.innerHTML += self.output;
	};

	self.recursiveFunction = function (_value, _print) {

		if (self.isNull(_value)) {
			var printedNull = self.printNull(_value);
			if (_print) {
				self.output += printedNull;
			}
			return printedNull;
		}

		if (self.isUndefined(_value)) {
			var printedUndefined = self.printUndefined(_value);
			if (_print) {
				self.output += printedUndefined;
			}
			return printedUndefined;
		}

		if (self.isBoolean(_value)) {
			var printedBoolean = self.printBoolean(_value);
			if (_print) {
				self.output += printedBoolean;
			}
			return printedBoolean;
		}

		if (self.isNumber(_value)) {
			var printedNumber = self.printNumber(_value);
			if (_print) {
				self.output += printedNumber;
			}
			return printedNumber;
		}

		if (self.isString(_value)) {
			var printedString = self.printString(_value);
			if (_print) {
				self.output += printedString;
			}
			return printedString;
		}

		if (self.isFunction(_value)) {
			var printedFunction = self.printFunction(_value);
			if (_print) {
				self.output += printedFunction;
			}
			return printedFunction;
		}

		if (self.isArray(_value)) {
			var printedArray = self.printArray(_value);
			if (_print) {
				self.output += printedArray;
			}
			return printedArray;
		}

		if (self.isObject(_value)) {
			var printedObject = self.printObject(_value);
			if (_print) {
				self.output += printedObject;
			}
			return printedObject;
		}

	};

	self.goDeeper = function (_value) {
		self.maxDepth++;
	};

	self.goShallower = function (_value) {
		self.maxDepth--;
		if (self.maxDepth < 1) {
			self.maxDepth = 1;
		}
	};

	self.recursive = function (_object, _function) {
		for (var _property in _object) {
			if (_object.hasOwnProperty(_property)) {

				if (self.depth === 1) {
					self.path = '';
					self.path += _property;
				} else if (self.depth > 1) {
					self.path += '.' + _property;
				}

				_function(_property, _object[_property], self.path, self.depth);
				if (self.isObject(_object[_property]) && self.depth < self.maxDepth) {
					self.depth++;
					self.recursive(_object[_property], _function, self.depth);
					self.depth--;
				}
			}
		}
	};

	self.isNull = function (_value) {
		return _value === null;
	};

	self.isBoolean = function (_value) {
		return typeof _value === 'boolean';
	};

	self.isUndefined = function (_value) {
		return typeof _value === 'undefined';
	};

	self.isNumber = function (_value) {
		return typeof _value === 'number' && !isNaN(_value);
	};

	self.isString = function (_value) {
		return typeof _value === 'string';
	};

	self.isFunction = function (value) {
		return typeof value === 'function';
	};

	self.isArray = function (_value) {
		return {}.toString.call(_value) === '[object Array]';
	};

	self.isObject = function (_value) {
		return typeof _value === 'object' && !Array.isArray(_value) && _value !== null;
	};

	self.classOf = function (_value) {
		return _value.constructor.name;
	};

	self.printNull = function (_value) {
		var output = '<span style="display: inline-block" class="logger-null">';
		output += 'null';
		output += '</span style="display: inline-block">';
		output += '<br />';
		return output;
	};

	self.printUndefined = function (_value) {
		var output = '<span style="display: inline-block" class="logger-undefined">';
		output += '"undefined"';
		output += '</span style="display: inline-block">';
		output += '<br />';
		return output;
	};

	self.printBoolean = function (_value) {
		var output = '<span style="display: inline-block" class="logger-boolean">';
		output += _value;
		output += '</span style="display: inline-block">';
		output += '<br />';
		return output;
	};

	self.printNumber = function (_value) {
		var output = '<span style="display: inline-block" class="logger-number">';
		output += _value;
		output += '</span style="display: inline-block">';
		output += '<br />';
		return output;
	};

	self.printString = function (_value) {
		var output = '<span style="display: inline-block" class="logger-string">';
		output += '"' + _value + '"';
		output += '</span style="display: inline-block">';
		output += '<br />';
		return output;
	};

	self.printFunction = function (_value) {
		var output = '<span style="display: inline-block" class="logger-function">';
		output += 'function';
		output += '</span style="display: inline-block">';
		output += '<br />';
		return output;
	};

	self.printArray = function (_value) {
		var output = '<pre style="display: inline.block;" class="logger-array">';
		output += self.stringify(_value, null, 8);
		output += '</pre>';
		output += '<br />';
		return output;
	};

	self.printObject = function (_value) {
		var output = '';
		self.recursive(_value, function (_key, _value, _path, _depth) {
			if (_depth > 1) {
				output += '<li style="padding-left: ' + _depth * 20 + 'px;">';
			} else {
				output += '<li>';
			}
			output += _key;
			output += ': ';

			if (self.isObject(_value)) {
				output += '<span style="display: inline-block;" class="logger-object">';
				output += self.classOf(_value);
				if (self.classOf(_value) !== 'Object') {
					// output += ' => ' + self.stringify(_value, null, 4);
					output += ' {} ';
				}
				output += '</span>';
			} else {
				output += self.recursiveFunction(_value, false);
			}

			output += '</li>';
		});
		return output;
	};

	self.stringify = function (obj, replacer, indent) {
		var printedObjects = [];
		var printedObjectKeys = [];

		function printOnceReplacer (key, value) {
			// browsers will not print more than 20K, I don't see the point to
			// allow 2K.. algorithm will not be fast anyway if we have too many objects
			if (printedObjects.length > 2000) {
				return 'object too long';
			}

			var printedObjIndex = false;

			printedObjects.forEach(function (obj, index) {

				if (obj === value) {
					printedObjIndex = index;
				}

			});

			// root element
			if (key === '') {

				printedObjects.push(obj);
				printedObjectKeys.push('root');
				return value;

			} else if (printedObjIndex + '' !== 'false' && typeof (value) === 'object') {

				if (printedObjectKeys[printedObjIndex] === 'root') {

					return '(pointer to root)';

				} else {

					return '(see ' + ((!!value && !!value.constructor) ? value.constructor.name.toLowerCase()  : typeof (value)) + ' with key ' + printedObjectKeys[printedObjIndex] + ')';

				}

			} else {

				var qualifiedKey = key || '(empty key)';
				printedObjects.push(value);
				printedObjectKeys.push(qualifiedKey);

				if (replacer) {

					return replacer(key, value);

				} else {

					return value;

				}

			}
		}
		return JSON.stringify(obj, printOnceReplacer, indent);
	};

};
