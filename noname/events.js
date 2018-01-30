/**
* Used to create custom events and attach to them one or more listeners that
* can be triggered once or multiple times.
* @class Events
* @constructor
*/
var Events = function () {
	'use strict';
	var self = this;

	/**
	* All the created events
	* @property pool
	* @type {Events Array}
	*/
	self.pool = [];

	/**
	* All the emitted events the will be triggered in the next update call
	* @property emitted
	* @type {Emitted events Array}
	*/
	self.emitted = [];

	/**
	* Returns the event if exists.
	* @method get
	* @param {String} eventName
	* @return {Event}
	*/
	self.get = function (pEventName) {
		var output = false;
		self.pool.forEach(function (event) {
			if (event.name === pEventName) {
				output = event;
			}
		});
		return output;
	};

	/**
	* Returns the listeners of an event.
	* @method getListeners
	* @param {event} Event
	* @return {Listeners array}
	*/
	self.getListeners = function (pEvent) {
		return pEvent.listeners;
	};

	/**
	* Returns the listener of an event if it have it.
	* @method getListener
	* @param {event} Event
	* @param {listener} Listener (the function that will be called)
	* @return {Listeners}
	*/
	self.getListener = function (pEvent, pListener) {
		var output = false;
		pEvent.listeners.forEach(function (listener) {
			if (listener.listener === pListener) {
				output = listener;
			}
		});
		return output;
	};

	/**
	* Creates an event and adds to it an event listener.
	* If the event already exists, it just adds the listener to the event.
	* @method on
	* @param {String} Event name
	* @param {function} Listener (the function that will be called)
	* @param {Number} Priority. The smaller the higher the priority.
	*/
	self.on = function (pEventName, pListener, pPriority, pOnce) {
		var event = self.get(pEventName);
		var listener = {
			priority: pPriority ? pPriority : 0,
			listener: pListener,
			once: pOnce ? pOnce : false
		};
		if (event) {
			event.listeners.push(listener);
		} else {
			event = {
				name: pEventName,
				listeners: []
			};
			event.listeners.push(listener);
			self.pool.push(event);
		}
	};

	/**
	* The same as "on" but the listener will be executed only once.
	* @method once
	* @param {String} Event name
	* @param {function} Listener (the function that will be called)
	* @param {Number} Priority. The smaller the higher the priority.
	*/
	self.once = function (pEventName, pListener, pPriority) {
		self.on(pEventName, pListener, pPriority, true);
	};

	/**
	* Removes a listener of an event. If the event have no more listeners
	* the event will be removed to.
	* @method off
	* @param {String} Event name
	* @param {function} Listener (the function that will be called)
	*/
	self.off = function (pEventName, pListener) {
		var index;
		var event = self.get(pEventName);
		if (!event) {
			return false;
		} else {
			var listener = self.getListener(event, pListener);
			index = event.listeners.indexOf(listener);
			if (index > -1) {
				event.listeners.splice(index, 1);
			}
		}
		if (event.listeners.length === 0) {
			index = self.pool.indexOf(event);
			if (index > -1) {
				self.pool.splice(index, 1);
			}
		}
	};

	/**
	* Adds the event to the emitted events pool. The listeners of this events
	* will be emitted when the "update" method will be called in order of priority.
	* @method emit
	* @param {String} Event name
	*/
	self.emit = function (pEventName) {
		var event = self.get(pEventName);
		if (event) {
			self.emitted.push(event);
		}
	};

	/**
	* Removes all events in the pool.
	* @method clear
	*/
	self.clear = function () {
		self.pool = [];
	};

	/**
	* Call all the listeners functions of the emitted events order by priority.
	* and removes the listeners that have trigger only once.
	* @method update
	*/
	self.update = function () {
		if (self.emitted !== []) {
			self.emitted.forEach(function (event) {
				event.listeners.sort(function (a, b) {
					return a.priority - b.priority;
				});
				event.listeners.forEach(function (listener) {
					listener.listener();
					window.requestAnimationFrame(function () {
						if (listener.once === true) {
							self.off(event.name, listener.listener);
						}
					});
				});
			});
			self.emitted = [];
		}
	};

};
