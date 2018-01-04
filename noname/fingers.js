var Fingers = function(_game) {
    "use strict";
    var self = this;
    self.touches = [];

    _game.render.canvas.addEventListener('touchstart', function (event) {
        self.touches = event.touches;
    }, false );

	_game.render.canvas.addEventListener('touchmove', function (event) {
        event.preventDefault();
        self.touches = event.touches;
    }, false );

	_game.render.canvas.addEventListener('touchend', function (event) {
        self.touches = event.touches;
    }, false );

    self.one = function (_function) {
        if (self.touches.length === 1) {
            _function(self.touches[0]);
        }
    }

    self.two = function (_function) {
        if (self.touches.length === 2) {
            _function(
                self.touches[0],
                self.touches[1],
            );
        }
    }

    self.three = function (_function) {
        if (self.touches.length === 3) {
            _function(
                self.touches[0],
                self.touches[1],
                self.touches[2]
            );
        }
    }

    self.four = function (_function) {
        if (self.touches.length === 4) {
            _function(
                self.touches[0],
                self.touches[1],
                self.touches[2],
                self.touches[3]
            );
        }
    }

    self.five = function (_function) {
        if (self.touches.length === 5) {
            _function(
                self.touches[0],
                self.touches[1],
                self.touches[2],
                self.touches[3],
                self.touches[4]
            );
        }
    }

    self.six = function (_function) {
        if (self.touches.length === 6) {
            _function(
                self.touches[0],
                self.touches[1],
                self.touches[2],
                self.touches[3],
                self.touches[4],
                self.touches[5]
            );
        }
    }

    self.seven = function (_function) {
        if (self.touches.length === 7) {
            _function(
                self.touches[0],
                self.touches[1],
                self.touches[2],
                self.touches[3],
                self.touches[4],
                self.touches[5],
                self.touches[6]
            );
        }
    }

    self.eight = function (_function) {
        if (self.touches.length === 8) {
            _function(
                self.touches[0],
                self.touches[1],
                self.touches[2],
                self.touches[3],
                self.touches[4],
                self.touches[5],
                self.touches[6],
                self.touches[7]
            );
        }
    }

    self.nine = function (_function) {
        if (self.touches.length === 9) {
            _function(
                self.touches[0],
                self.touches[1],
                self.touches[2],
                self.touches[3],
                self.touches[4],
                self.touches[5],
                self.touches[6],
                self.touches[7],
                self.touches[8]
            );
        }
    }

    self.ten = function (_function) {
        if (self.touches.length === 10) {
            _function(
                self.touches[0],
                self.touches[1],
                self.touches[2],
                self.touches[3],
                self.touches[4],
                self.touches[5],
                self.touches[6],
                self.touches[7],
                self.touches[8],
                self.touches[9]
            );
        }
    }

};
