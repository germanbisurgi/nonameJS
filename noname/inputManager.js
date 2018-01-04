var InputManager = function(_game) {

    "use strict";
    var self = this;

    self.touches = [];

    _game.render.canvas.addEventListener('touchstart', function (event) {
        console.log(event);
        self.touches = event.touches;
    }, false );

	_game.render.canvas.addEventListener('touchmove', function (event) {
        event.preventDefault();
        self.touches = event.touches;
        console.log('touchmove');
    }, false );

	_game.render.canvas.addEventListener('touchend', function (event) {
        self.touches = event.touches;
        console.log('touchend');
    }, false );

    self.drawTouches = function () {
        for(var i=0; i<self.touches.length; i++) {
			var touch = self.touches[i];
			_game.render.context.beginPath();
			_game.render.context.fillStyle = "white";
			_game.render.context.fillText("touch id : "+touch.identifier+" x:"+touch.clientX+" y:"+touch.clientY, touch.clientX+30, touch.clientY-30);
			_game.render.context.beginPath();
			_game.render.context.strokeStyle = "cyan";
			_game.render.context.lineWidth = "6";
			_game.render.context.arc(touch.clientX, touch.clientY, 40, 0, Math.PI*2, true);
			_game.render.context.stroke();
		}

    }

    self.keyboard = {
        enter: false,
        shift: false,
        control: false,
        alt: false,
        spacebar: false,
        arrowLeft: false,
        arrowUp: false,
        arrowRight: false,
        arrowDown: false,
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false,
        h: false,
        i: false,
        j: false,
        k: false,
        l: false,
        m: false,
        n: false,
        o: false,
        p: false,
        q: false,
        r: false,
        s: false,
        t: false,
        u: false,
        v: false,
        w: false,
        x: false,
        y: false,
        z: false,
        num0: false,
        num1: false,
        num2: false,
        num3: false,
        num4: false,
        num5: false,
        num6: false,
        num7: false,
        num8: false,
        num9: false,
    };

    document.addEventListener('keydown', function (event) {
        event.preventDefault();
        switch (event.keyCode) {
            case 13 : self.keyboard.enter      = true; break;
            case 16 : self.keyboard.shift      = true; break;
            case 17 : self.keyboard.control    = true; break;
            case 18 : self.keyboard.alt        = true; break;
            case 27 : self.keyboard.escape     = true; break;
            case 32 : self.keyboard.spacebar   = true; break;
            case 37 : self.keyboard.arrowLeft  = true; break;
            case 38 : self.keyboard.arrowUp    = true; break;
            case 39 : self.keyboard.arrowRight = true; break;
            case 40 : self.keyboard.arrowDown  = true; break;
            case 48 : self.keyboard.num0       = true; break;
            case 49 : self.keyboard.num1       = true; break;
            case 50 : self.keyboard.num2       = true; break;
            case 51 : self.keyboard.num3       = true; break;
            case 52 : self.keyboard.num4       = true; break;
            case 53 : self.keyboard.num5       = true; break;
            case 54 : self.keyboard.num6       = true; break;
            case 55 : self.keyboard.num7       = true; break;
            case 56 : self.keyboard.num8       = true; break;
            case 57 : self.keyboard.num9       = true; break;
            case 65 : self.keyboard.a          = true; break;
            case 66 : self.keyboard.b          = true; break;
            case 67 : self.keyboard.c          = true; break;
            case 68 : self.keyboard.d          = true; break;
            case 69 : self.keyboard.e          = true; break;
            case 70 : self.keyboard.f          = true; break;
            case 71 : self.keyboard.g          = true; break;
            case 72 : self.keyboard.h          = true; break;
            case 73 : self.keyboard.i          = true; break;
            case 74 : self.keyboard.j          = true; break;
            case 75 : self.keyboard.k          = true; break;
            case 76 : self.keyboard.l          = true; break;
            case 77 : self.keyboard.m          = true; break;
            case 78 : self.keyboard.n          = true; break;
            case 79 : self.keyboard.o          = true; break;
            case 80 : self.keyboard.p          = true; break;
            case 81 : self.keyboard.q          = true; break;
            case 82 : self.keyboard.r          = true; break;
            case 83 : self.keyboard.s          = true; break;
            case 84 : self.keyboard.t          = true; break;
            case 85 : self.keyboard.u          = true; break;
            case 86 : self.keyboard.v          = true; break;
            case 87 : self.keyboard.w          = true; break;
            case 88 : self.keyboard.x          = true; break;
            case 89 : self.keyboard.y          = true; break;
            case 90 : self.keyboard.z          = true; break;
        }
    }, false);

    document.addEventListener('keyup', function (event) {
        event.preventDefault();
        switch (event.keyCode) {
            case 13 : self.keyboard.enter      = false; break;
            case 16 : self.keyboard.shift      = false; break;
            case 17 : self.keyboard.control    = false; break;
            case 18 : self.keyboard.alt        = false; break;
            case 27 : self.keyboard.escape     = false; break;
            case 32 : self.keyboard.spacebar   = false; break;
            case 37 : self.keyboard.arrowLeft  = false; break;
            case 38 : self.keyboard.arrowUp    = false; break;
            case 39 : self.keyboard.arrowRight = false; break;
            case 40 : self.keyboard.arrowDown  = false; break;
            case 48 : self.keyboard.num0       = false; break;
            case 49 : self.keyboard.num1       = false; break;
            case 50 : self.keyboard.num2       = false; break;
            case 51 : self.keyboard.num3       = false; break;
            case 52 : self.keyboard.num4       = false; break;
            case 53 : self.keyboard.num5       = false; break;
            case 54 : self.keyboard.num6       = false; break;
            case 55 : self.keyboard.num7       = false; break;
            case 56 : self.keyboard.num8       = false; break;
            case 57 : self.keyboard.num9       = false; break;
            case 65 : self.keyboard.a          = false; break;
            case 66 : self.keyboard.b          = false; break;
            case 67 : self.keyboard.c          = false; break;
            case 68 : self.keyboard.d          = false; break;
            case 69 : self.keyboard.e          = false; break;
            case 70 : self.keyboard.f          = false; break;
            case 71 : self.keyboard.g          = false; break;
            case 72 : self.keyboard.h          = false; break;
            case 73 : self.keyboard.i          = false; break;
            case 74 : self.keyboard.j          = false; break;
            case 75 : self.keyboard.k          = false; break;
            case 76 : self.keyboard.l          = false; break;
            case 77 : self.keyboard.m          = false; break;
            case 78 : self.keyboard.n          = false; break;
            case 79 : self.keyboard.o          = false; break;
            case 80 : self.keyboard.p          = false; break;
            case 81 : self.keyboard.q          = false; break;
            case 82 : self.keyboard.r          = false; break;
            case 83 : self.keyboard.s          = false; break;
            case 84 : self.keyboard.t          = false; break;
            case 85 : self.keyboard.u          = false; break;
            case 86 : self.keyboard.v          = false; break;
            case 87 : self.keyboard.w          = false; break;
            case 88 : self.keyboard.x          = false; break;
            case 89 : self.keyboard.y          = false; break;
            case 90 : self.keyboard.z          = false; break;
        }
    }, false);

    self.pressing = function (_keys) {
        var countPressed = 0
        _keys.forEach( function (_key) {
            if (self.keyboard[_key]) {
                countPressed++;
            }
        });
        return countPressed === _keys.length;
    }


    window.addEventListener("gamepadconnected", function(e) {
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    });

    window.addEventListener("gamepaddisconnected", function(e) {
      console.log("Gamepad disconnected from index %d: %s",
        e.gamepad.index, e.gamepad.id);
    });


};
