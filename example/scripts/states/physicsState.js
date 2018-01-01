var physicsState = new Bamboo.state('physicsState');

physicsState.create = function () {
    var debugContext = document.querySelector('.physics-canvas').getContext("2d");
    this.physics.init(60, 0, 50, true, debugContext);

    // edges
    this.edge1 = this.physics.addEdge(-100, 0, 190, 191, 'static');
    this.edge2 = this.physics.addEdge(190, 190, 400, 0, 'static');

    // circles
    this.disc1 = this.entities.addImage('disc', 50, 50, 50, 50);
    this.disc2 = this.entities.addImage('disc', 50, 50, 50, 50);
    this.disc3 = this.entities.addImage('disc', 50, 50, 50, 50);
    this.disc4 = this.entities.addImage('disc', 50, 50, 50, 50);
    this.mine5 = this.entities.addImage('mine', 50, 50, 25, 25);
    this.circleBody = this.physics.addBody(300, 0, 'dynamic');
    this.circleFixture1 = this.physics.addCircle(this.circleBody, 25, -50, 0);
    this.circleFixture2 = this.physics.addCircle(this.circleBody, 25, 50, 0);
    this.circleFixture3 = this.physics.addCircle(this.circleBody, 25, 0, -50);
    this.circleFixture4 = this.physics.addCircle(this.circleBody, 25, 0, 50);

    //Rectangles
    this.rectMine = this.entities.addImage('mine', 50, 50, 25, 25);
    this.rectStone1 = this.entities.addImage('stone', 50, 50, 50, 50);
    this.rectStone2 = this.entities.addImage('stone', 50, 50, 50, 50);
    this.rectStone3 = this.entities.addImage('stone', 50, 50, 50, 50);
    this.rectStone4 = this.entities.addImage('stone', 50, 50, 50, 50);
    this.rectBody = this.physics.addBody(60, 25, 'dynamic');
    this.rectFixture1 = this.physics.addRectangle(this.rectBody, 50, 50, -50, 0);
    this.rectFixture2 = this.physics.addRectangle(this.rectBody, 50, 50, 50, 0);
    this.rectFixture3 = this.physics.addRectangle(this.rectBody, 50, 50, 0, -50);
    this.rectFixture4 = this.physics.addRectangle(this.rectBody, 50, 50, 0, 50);

    // Polygons
    this.polyMine = this.entities.addImage('mine', 50, 50, 25, 25);
    this.polyStone1 = this.entities.addImage('stone', 50, 50, 50, 50);
    this.polyStone2 = this.entities.addImage('stone', 50, 50, 50, 50);
    this.polyBody = this.physics.addBody(200, 100, 'kinematic');
    this.polyFixture1 = this.physics.addPolygon(this.polyBody, [
        {x:   0, y:  0},
        {x:  50, y:  0},
        {x: 100, y: 25},
        {x:  50, y: 50},
        {x:   0, y: 50}
    ]);
    this.polyFixture2 = this.physics.addPolygon(this.polyBody, [
        {x:    0, y:   0},
        {x:  -50, y:   0},
        {x: -100, y: -25},
        {x:  -50, y: -50},
        {x:    0, y: -50}
    ]);
    this.polyFixture3 = this.physics.addRectangle(this.polyBody, 1, 1, 25, 25);
    this.polyFixture4 = this.physics.addRectangle(this.polyBody, 1, 1, -25, -25);
    this.polyBody.m_angularVelocity = 1;


    /*this.polyFixture1.SetUserData({name: 'banana'});
    this.physics.contactListener().BeginContact = function(contact) {
        var a = contact.GetFixtureA().GetUserData();
        var b = contact.GetFixtureB().GetUserData();

        if (a && a.name === 'banana') {
            console.log('hit');
        }
    };*/

};



physicsState.update = function () {

    this.physics.followBody(this.mine5, this.circleBody);
    this.physics.followFixture(this.disc1, this.circleFixture1);
    this.physics.followFixture(this.disc2, this.circleFixture2);
    this.physics.followFixture(this.disc3, this.circleFixture3);
    this.physics.followFixture(this.disc4, this.circleFixture4);

    this.physics.followBody(this.rectMine, this.rectBody);
    this.physics.followFixture(this.rectStone1, this.rectFixture1);
    this.physics.followFixture(this.rectStone2, this.rectFixture2);
    this.physics.followFixture(this.rectStone3, this.rectFixture3);
    this.physics.followFixture(this.rectStone4, this.rectFixture4);

    this.physics.followBody(this.polyMine, this.polyBody);
    this.physics.followFixture(this.polyStone1, this.polyFixture3);
    this.physics.followFixture(this.polyStone2, this.polyFixture4);
    
};





physicsState.afterCreate = function () {
    var loadScreen = document.querySelector('.loading');
    loadScreen.classList.remove('show');
};

physicsState.postRender = function () {
    this.renderer.context.fillText('currentState:    ' + this.name, 200, 15);
    this.renderer.context.fillText('state time:      ' +  Math.floor(this.time.current / 1000), 200, 30);
};