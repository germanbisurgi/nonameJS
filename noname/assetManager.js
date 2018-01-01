var AssetManager = function () {
    "use strict";
    var self = this;
    self.loading = false;
    self.queue = [];
    self.success = 0;
    self.errors = 0;
    self.lastLoaded = null;
    self.pool = [];

    self.reset = function () {
        self.queue = [];
        self.success = 0;
        self.errors = 0;
    };

    self.list = function () {
        return self.pool;
    };

    self.queueAudio = function(_name, _path) {
        self.queue.push({
            type: 'audio',
            name: _name,
            path: _path
        });
    };

    self.queueImage = function(_name, _path) {
        self.queue.push({
            type: 'image',
            name: _name,
            path: _path,
        });
    };

    self.get = function(_name) {
        var output = false;
        self.pool.forEach(function (_asset) {
            if (_asset.name === _name) {
                output = _asset;
            }
        });
        return output;
    };

    self.loadAll = function () {
        if (self.queue.length > 0) {
            self.loading = true;
            self.queue.forEach(function (_asset) {
                if (self.get(_asset.name)) {
                    console.log('Asset already loaded ->', asset.name);
                    self.success++;
                    if (self.loadComplete()) {
                        self.loading = false;
                        self.reset();
                    }
                } else {
                    if (_asset.type === 'image') {
                        self.loadImage(_asset);
                    }
                    if (_asset.type === 'audio') {
                        self.loadAudio(_asset);
                    }
                }
            });
        }
    };

    self.loadImage = function (_asset) {
        var img = new Image();
        img.onload = function() {
            self.lastLoaded = _asset.name;
            self.success++;
            if (self.loadComplete ()) {
                self.loading = false;
                self.reset();
            }
        };
        img.onerror = function() {
            self.errors++;
            if (self.loadComplete ()) {
                self.loading = false;
                self.reset();
            }
        };
        img.src = _asset.path;
        img.name = _asset.name;
        self.pool.push(img);
    };

    self.loadAudio = function (_asset) {
        var audio = new Audio();
        audio.oncanplaythrough = function() {
            self.lastLoaded = _asset.name;
            self.success++;
            if (self.loadComplete ()) {
                self.loading = false;
                self.reset();
            }
        };
        audio.onerror = function() {
            self.errors++;
            if (self.loadComplete ()) {
                self.loading = false;
                self.reset();
            }
        };
        audio.src = _asset.path;
        audio.name = _asset.name;
        self.pool.push(audio);
    };

    self.progress = function () {
        var progress = Math.floor((self.success + self.errors) / self.queue.length * 100);
        if (isNaN(progress)) {
            progress = 100;
        }
        return progress;
    };

    self.loadComplete  = function () {
        return self.queue.length === self.success + self.errors;
    };

};
