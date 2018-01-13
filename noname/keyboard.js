var Keyboard = function() {
    "use strict";
    var self = this;
    self.keys = {
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
        num9: false
    };

    document.addEventListener('keydown', function (event) {
        event.preventDefault();
        switch (event.keyCode) {
            case 13 : self.keys.enter      = true; break;
            case 16 : self.keys.shift      = true; break;
            case 17 : self.keys.control    = true; break;
            case 18 : self.keys.alt        = true; break;
            case 27 : self.keys.escape     = true; break;
            case 32 : self.keys.spacebar   = true; break;
            case 37 : self.keys.arrowLeft  = true; break;
            case 38 : self.keys.arrowUp    = true; break;
            case 39 : self.keys.arrowRight = true; break;
            case 40 : self.keys.arrowDown  = true; break;
            case 48 : self.keys.num0       = true; break;
            case 49 : self.keys.num1       = true; break;
            case 50 : self.keys.num2       = true; break;
            case 51 : self.keys.num3       = true; break;
            case 52 : self.keys.num4       = true; break;
            case 53 : self.keys.num5       = true; break;
            case 54 : self.keys.num6       = true; break;
            case 55 : self.keys.num7       = true; break;
            case 56 : self.keys.num8       = true; break;
            case 57 : self.keys.num9       = true; break;
            case 65 : self.keys.a          = true; break;
            case 66 : self.keys.b          = true; break;
            case 67 : self.keys.c          = true; break;
            case 68 : self.keys.d          = true; break;
            case 69 : self.keys.e          = true; break;
            case 70 : self.keys.f          = true; break;
            case 71 : self.keys.g          = true; break;
            case 72 : self.keys.h          = true; break;
            case 73 : self.keys.i          = true; break;
            case 74 : self.keys.j          = true; break;
            case 75 : self.keys.k          = true; break;
            case 76 : self.keys.l          = true; break;
            case 77 : self.keys.m          = true; break;
            case 78 : self.keys.n          = true; break;
            case 79 : self.keys.o          = true; break;
            case 80 : self.keys.p          = true; break;
            case 81 : self.keys.q          = true; break;
            case 82 : self.keys.r          = true; break;
            case 83 : self.keys.s          = true; break;
            case 84 : self.keys.t          = true; break;
            case 85 : self.keys.u          = true; break;
            case 86 : self.keys.v          = true; break;
            case 87 : self.keys.w          = true; break;
            case 88 : self.keys.x          = true; break;
            case 89 : self.keys.y          = true; break;
            case 90 : self.keys.z          = true; break;
        }
    }, false);

    document.addEventListener('keyup', function (event) {
        event.preventDefault();
        switch (event.keyCode) {
            case 13 : self.keys.enter      = false; break;
            case 16 : self.keys.shift      = false; break;
            case 17 : self.keys.control    = false; break;
            case 18 : self.keys.alt        = false; break;
            case 27 : self.keys.escape     = false; break;
            case 32 : self.keys.spacebar   = false; break;
            case 37 : self.keys.arrowLeft  = false; break;
            case 38 : self.keys.arrowUp    = false; break;
            case 39 : self.keys.arrowRight = false; break;
            case 40 : self.keys.arrowDown  = false; break;
            case 48 : self.keys.num0       = false; break;
            case 49 : self.keys.num1       = false; break;
            case 50 : self.keys.num2       = false; break;
            case 51 : self.keys.num3       = false; break;
            case 52 : self.keys.num4       = false; break;
            case 53 : self.keys.num5       = false; break;
            case 54 : self.keys.num6       = false; break;
            case 55 : self.keys.num7       = false; break;
            case 56 : self.keys.num8       = false; break;
            case 57 : self.keys.num9       = false; break;
            case 65 : self.keys.a          = false; break;
            case 66 : self.keys.b          = false; break;
            case 67 : self.keys.c          = false; break;
            case 68 : self.keys.d          = false; break;
            case 69 : self.keys.e          = false; break;
            case 70 : self.keys.f          = false; break;
            case 71 : self.keys.g          = false; break;
            case 72 : self.keys.h          = false; break;
            case 73 : self.keys.i          = false; break;
            case 74 : self.keys.j          = false; break;
            case 75 : self.keys.k          = false; break;
            case 76 : self.keys.l          = false; break;
            case 77 : self.keys.m          = false; break;
            case 78 : self.keys.n          = false; break;
            case 79 : self.keys.o          = false; break;
            case 80 : self.keys.p          = false; break;
            case 81 : self.keys.q          = false; break;
            case 82 : self.keys.r          = false; break;
            case 83 : self.keys.s          = false; break;
            case 84 : self.keys.t          = false; break;
            case 85 : self.keys.u          = false; break;
            case 86 : self.keys.v          = false; break;
            case 87 : self.keys.w          = false; break;
            case 88 : self.keys.x          = false; break;
            case 89 : self.keys.y          = false; break;
            case 90 : self.keys.z          = false; break;
        }
    }, false);

    self.pressing = function (_keys) {
        var countPressed = 0;
        _keys.forEach( function (_key) {
            if (self.keys[_key]) {
                countPressed++;
            }
        });
        return countPressed === _keys.length;
    }

};
