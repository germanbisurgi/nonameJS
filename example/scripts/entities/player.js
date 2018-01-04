var Player = function () {
    var self = this;
    self.create = function (_entities) {
        var player = _entities.addSprite('player2', 125, 50, 50, 50, 32, 32);
        player.addAnimation('walkUp',        [36, 37, 38, 37] );
        player.addAnimation('walkRight',     [24, 25, 26, 25] );
        player.addAnimation('walkDown',      [ 0,  1,  2,  1] );
        player.addAnimation('walkLeft',      [12, 13, 14, 13] );
        player.addAnimation('walkUpRight',   [39, 40, 41, 40] );
        player.addAnimation('walkUpLeft',    [15, 16, 17, 16] );
        player.addAnimation('walkDownRight', [27, 28, 29, 28] );
        player.addAnimation('walkDownLeft',  [ 3,  4,  5,  4] );
        player.addAnimation('idleUp',        [37] );
        player.addAnimation('idleRight',     [25] );
        player.addAnimation('idleDown',      [ 1] );
        player.addAnimation('idleLeft',      [13] );
        player.addAnimation('idleUpRight',   [40] );
        player.addAnimation('idleUpLeft',    [16] );
        player.addAnimation('idleDownRight', [28] );
        player.addAnimation('idleDownLeft',  [ 4] );
        player.play('idleDown');
        return player;
    }
    self.update = function (_inputs) {
        if (navigator.getGamepads()[0]) {
            var triangle = navigator.getGamepads()[0].buttons[0].pressed;
            var circle = navigator.getGamepads()[0].buttons[1].pressed;
            var x = navigator.getGamepads()[0].buttons[2].pressed;
            var square = navigator.getGamepads()[0].buttons[3].pressed;
            var l1 = navigator.getGamepads()[0].buttons[4].pressed;
            var r1 = navigator.getGamepads()[0].buttons[5].pressed;
            var l2 = navigator.getGamepads()[0].buttons[6].pressed;
            var r2 = navigator.getGamepads()[0].buttons[7].pressed;
            var select = navigator.getGamepads()[0].buttons[8].pressed;
            var start = navigator.getGamepads()[0].buttons[9].pressed;
            var up = Math.floor(navigator.getGamepads()[0].axes[1]) === -1;
            var right =  Math.floor(navigator.getGamepads()[0].axes[0]) === 1;
            var down =  Math.floor(navigator.getGamepads()[0].axes[1]) === 1;
            var left = Math.floor(navigator.getGamepads()[0].axes[0]) === -1;
        }
        if (this.inputs.pressing(['y']) || l2) {
            this.player.rotate(-speed);
        }
        if (this.inputs.pressing(['x']) || r2) {
            this.player.rotate(speed);
        }
        if (this.inputs.pressing(['arrowUp', 'arrowRight']) || up && right) {
            this.player.move(speed, -speed);
            this.player.play('walkUpRight', 100);
        } else if (this.inputs.pressing(['arrowUp', 'arrowLeft']) || up && left) {
            this.player.play('walkUpLeft', 100);
            this.player.move(-speed, -speed);
        } else if (this.inputs.pressing(['arrowDown', 'arrowRight']) || down && right) {
            this.player.move(speed, speed);
            this.player.play('walkDownRight', 100);
        } else if (this.inputs.pressing(['arrowDown', 'arrowLeft']) || down && left) {
            this.player.move(-speed, speed);
            this.player.play('walkDownLeft', 100);
        } else if (this.inputs.pressing(['arrowRight', 'arrowLeft']) || this.inputs.pressing(['arrowDown', 'arrowUp'])) {
            // nothing
        } else if (this.inputs.pressing(['arrowUp']) || up) {
            this.player.move(0, -speed);
            this.player.play('walkUp', 100);
        } else if (this.inputs.pressing(['arrowRight']) || right) {
            this.player.move(speed, 0);
            this.player.play('walkRight', 100);
        } else if (this.inputs.pressing(['arrowDown']) || down) {
            this.player.move(0, speed);
            this.player.play('walkDown', 100);
        } else if (this.inputs.pressing(['arrowLeft']) || left) {
            this.player.move(-speed, 0);
            this.player.play('walkLeft', 100);
        } else {
            switch (this.player.lastAnimation) {
                case 'walkUp':
                    this.player.play('idleUp', 1);
                    break;
                case 'walkRight':
                    this.player.play('idleRight', 1);
                    break;
                case 'walkDown':
                    this.player.play('idleDown', 1);
                    break;
                case 'walkLeft':
                    this.player.play('idleLeft', 1);
                    break;
                case 'walkUpRight':
                    this.player.play('idleUpRight', 1);
                    break;
                case 'walkUpLeft':
                    this.player.play('idleUpLeft', 1);
                    break;
                case 'walkDownRight':
                    this.player.play('idleDownRight', 1);
                    break;
                case 'walkDownLeft':
                    this.player.play('idleDownLeft', 1);
                    break;
            }
        }
    }
}
