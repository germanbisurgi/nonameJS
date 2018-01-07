var Spaceship = function (_state) {
    var self = this;
    self.state = _state;
    self.entity = null;

    self.create = function () {
        self.state.shipBody = self.state.box2d.addBody(5, -50, 'dynamic');
        self.state.shipFixture1 = self.state.box2d.addCircle(self.state.shipBody, 50, -13, 0);
        self.state.shipFixture2 = self.state.box2d.addCircle(self.state.shipBody, 28, 30, 0);
        self.state.shipImage = self.state.entities.addImage('falcon', 0, 0, 130, 100);
        self.state.shipBody.SetAngularDamping(5);
        self.state.shipBody.SetLinearDamping(0.5);
    }

    self.update = function () {
        //touch controller
        var leftController = null;
        var rightController = null;
        self.state.inputs.fingers.pool.forEach(function (_finger) {
            if (_finger.startX <= window.innerWidth / 2 ) {
                if (!leftController) {
                    leftController = _finger;
                    if (leftController.offsetX !== 0 && leftController.offsetY !== 0) {
                        // angle
                        self.state.spaceshipAngle = self.state.math.toRadians(self.state.math.angleToPointer(
                            leftController.offsetX,
                            leftController.offsetY,
                            0,
                            0
                        ));
                        self.state.shipBody.SetAngle(self.state.spaceshipAngle);
                        // force
                        self.state. controllerOffset = self.state.math.distance(0,0,leftController.offsetX,leftController.offsetY);
                        self.state.shipBody.ApplyForce(
                            {
                                'x': Math.cos(self.state.spaceshipAngle) * self.state. controllerOffset,
                                'y': Math.sin(self.state.spaceshipAngle) * self.state. controllerOffset
                            },
                            self.state.shipBody.GetWorldCenter()
                        );
                    }
                }
            } else {
                if (!rightController) {
                    rightController = _finger;
                    //self.state.shipBody.ApplyForce({'x': cos * _finger.offsetY * -5, 'y': sin * _finger.offsetY * -5}, self.state.shipBody.GetWorldCenter());
                }
            }
        });
    }
}
