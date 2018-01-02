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
    self.update = function (_inputs) {}
}
