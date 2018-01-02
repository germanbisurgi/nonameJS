var LoopManager = function (_config) {
    'use strict';
    var self = this;
    self.fps = null;
    self.delta = null;
    self.paused = false;
    self.frames = 0;

    self.init = function () {
        self.fps = _config.fps || 60;
        window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  function( callback ){
                    window.setTimeout(callback, 1000 / self.fps);
                  };
        })();
    };

    self.start = function(_task) {
        var lastTime = performance.now();
        var offset = self.fps >= 10 ? 0.5 : 0;
        function tick(timestamp) {
            if (!self.paused) {
                self.delta = timestamp - lastTime;
                if (self.delta >= 1000 / (self.fps + offset)) {
                    lastTime = timestamp;
                    self.frames++;
                    _task();
                }
                requestAnimFrame(tick);
            }
        }
        requestAnimFrame(tick);
    };

    self.timestamp = function () {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    self.pause = function () {
       self.paused = true;
    };

    self.continue = function () {
       self.paused = false;
    };

    self.isPaused = function () {
        return self.paused;
    };

    self.getDelta = function () {
        return self.delta;
    };

    self.init();

};
