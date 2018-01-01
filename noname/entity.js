var Entity = function (_state, _clock) {
    "use strict";
    var self = this;
    self.state = _state;
    self.clock = _clock;
    self.draw = true;

    self.setClock = function (_clock) {
        self.clock(_clock);
    }

    self.addComponent = function (_component) {
        for (var _property in _component) {
            self[_property] = _component[_property];
        }
    }

    self.print = function () {
        console.log(self);
    }

};
