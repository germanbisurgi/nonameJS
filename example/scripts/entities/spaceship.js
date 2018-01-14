var Spaceship = function (_state) {
    var self = this;
    self.body = _state.box2d.addBody(5, -50, 'dynamic');
    self.body.SetAngularDamping(5);
    self.body.SetLinearDamping(0.5);
    self.position = self.body.GetPosition();
    self.angle = self.body.GetAngle();
    self.force = null;
    self.fixture1 = _state.box2d.addCircle(self.body, 50, -13, 0);
    self.fixture2 = _state.box2d.addCircle(self.body, 28, 30, 0);
    self.image = _state.entities.addImage('falcon', 0, 0, 130, 100);
    self.canShot = false;
    self.canShotInterval = _state.clock.master.setInterval(function () {
        self.canShot = true;
    }, 500, _state);
    self.bulletPosition = null;
    self.leftController = null;
    self.rightController = null;
    self.controllerOffset = null;


    self.update = function () {
        self.leftController = null;
        self.rightController = null;
        _state.inputs.fingers.pool.forEach(function (_finger) {
            if (_finger.startX <= window.innerWidth / 2 ) {
                if (!self.leftController) {
                    self.leftController = _finger;
                    if (self.leftController.offsetX !== 0 && self.leftController.offsetY !== 0) {
                        // angle
                        self.angle = _state.math.toRadians(_state.math.pointToAngle(
                            0,
                            0,
                            self.leftController.offsetX,
                            self.leftController.offsetY
                        ));
                        self.body.SetAngle(self.angle);
                        // force
                        self.controllerOffset = Math.floor(_state.math.distance(0,0,self.leftController.offsetX, self.leftController.offsetY)) || 0;
                        self.force = _state.math.clamp(self.controllerOffset * 8, 0, 600);
                        self.body.ApplyForce(
                            {
                                'x': Math.cos(self.angle) * self.force,
                                'y': Math.sin(self.angle) * self.force
                            },
                            self.body.GetWorldCenter()
                        );
                    }
                }
            } else {
                if (!self.rightController) {
                    self.rightController = _finger;
                    if (self.canShot) {

                        self.canShot = false;
                        self.bulletPosition = _state.math.angleToPoint(
                            self.body.GetAngle(),
                            self.body.GetPosition().x * 30,
                            self.body.GetPosition().y * 30,
                            50
                        );
                        // bullet
                        _state.bullet = _state.box2d.addBody(
                            self.bulletPosition.x,
                            self.bulletPosition.y,
                            'dynamic'
                        );
                        _state.bulletFixture = _state.box2d.addCircle(_state.bullet, 5, 0, 0);
                        _state.bullet.ApplyForce(
                            {
                                'x': Math.cos(self.angle) * 5000,
                                'y': Math.sin(self.angle) * 5000
                            },
                            _state.bullet.GetWorldCenter()
                        );
                    }
                }
            }
        });

        _state.box2d.followBody(self.image, self.body);
        _state.camera.follow(self.image);

    };

    self.destroy = function () {
        // find a way to remove bodies and entities;
    }
};
