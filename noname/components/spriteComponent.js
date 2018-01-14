var SpriteComponent = function (_image, _sourceWidth, _sourceHeight) {
    this.image = _image;
    this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = _sourceWidth;
    this.sourceHeight = _sourceHeight;
    this.opacity = 1.0;
    this.delay = 0;
    this.counter = 0;
    this.animations = [];
    this.lastAnimation = null;
    this.addAnimation = function (_name, _sequence) {
        if (!this.getAnimation(_name)) {
            this.animations.push({
                name: _name,
                sequence: _sequence
            });
        }
    };
    this.getAnimation = function (_animationName) {
        var output = false;
        this.animations.forEach(function(animation) {
            if (animation.name === _animationName) {
                output = animation;
            }
        });
        return output;
    };
    this.play = function (_animationName, _delay) {
        if (!this.clock.paused) {
            var animation = this.getAnimation(_animationName);
            if (animation) {
                this.lastAnimation = _animationName;
                var columns = this.image.width / this.sourceWidth;
                this.delay += this.clock.delta * this.clock.motion;
                if (this.delay >= _delay) {
                    this.counter = (this.counter + 1) % animation.sequence.length;
                    this.delay = 0;
                }
                this.sourceY = Math.floor((animation.sequence[this.counter] + 1) / columns) * this.sourceHeight;
                this.sourceX = this.sourceWidth * animation.sequence[this.counter]  - this.image.width * this.sourceY / this.sourceHeight;
            }
        }
    };
};
