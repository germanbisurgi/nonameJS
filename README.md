# nonameJS

nonameJS want to be a 2d game engine based on web technologies.


## Make a new Game

To make a nonameJS game you need at least two things:

1) an HTML element to contain the game canvas.

```html
<div class="screen"></div>
```

2) A game state: an object that will allow you to split the logic of a game and manage assets loading by giving you the specialized tools.

```javascript
var myState = new noname.state('myState');

myState.preload = function () {
    // this code will allow you can put load your assets (images, audio, ecc)
    this.assets.queueImage('stone', 'assets/path/stone.png');
};

myState.loading = function () {
    // this code will be running while the game is loading assets
    console.log(this.assets.progress)
};

myState.create = function () {
    // this code allows you to create your entities (game objects)
    this.myEntitty = this.entities.addImage('stone', 0, 0, 0, 0);
}

myState.update = function () {
    // this code will execute the logic behin your game
    this.myEntitty.move(50, 0);
};
```

The game class takes a configuration array as parameter. If a required
configuration property is not given the game will not start and the console will
warn you.

```javascript
var game = new noname.game({
    screen: document.querySelector('.screen'),
    fps: 30,
    dps: 30,
    states: [mapState, myState],
    initialState: 'myState'
});
```

<table>
    <thead>
        <tr>
            <th>setting</th>
            <th>description</th>
            <th>default</th>
            <th>required</th>
            <th>example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>screen</td>
            <td>An HTML element that will hold the game canvas</td>
            <td> - </td>
            <td> yes </td>
            <td> document.querySelector('.screen')</td>
        </tr>
        <tr>
            <td>states</td>
            <td>An array of states objects</td>
            <td>its required andwill be always an Array</td>
            <td> yes</td>
            <td> [mapState, myState]</td>
        </tr>
        <tr>
            <td>fps</td>
            <td>How many times per second the game will update the state of the game</td>
            <td> 60 </td>
            <td> no</td>
            <td> 60</td>
        </tr>
        <tr>
            <td>dps</td>
            <td>How many times per second the game will draw the state of the game. A dps greater tha the fps will be setted equal to the fps</td>
            <td> 60 or equal to FPS</td>
            <td> no</td>
            <td> 30 </td>
        </tr>
        <tr>
            <td>initialState</td>
            <td>a string that specify the name of the state that will be loaded first</td>
            <td>The first state object in the states array</td>
            <td> no</td>
            <td> 'myState'</td>
        </tr>
    </tbody>
</table>

## The Managers

nonameJS give to you a bunch of tools or "Managers" that allow you to create and manage what, when, and how things happen in your game. You can access this managers from every state you create. They are the following.

### loop
This manager is the heart of your game. Like its name says, it´s a loop where your code goes in. It will execute as often as you configure it int the fps setting. He´s job is to repeat your states objects logic code several times per second.

### state
This manager allows you to add and switch your states.

### inputs
This manager give you handy inputs abstractions like keyboard keys, touch, mouse, etc.

### clock
This manager makes ease to manage time in your game. like how fast things happen, when an event will be trigger, slow motion, etc.

### entities
This manager manage all your entities (game objects). It´s most important job is to add and remove entities from your states, but it´s have a bunch of helper methods that make ease to create pre-composed entities like sprites, images, tile sprites, etc.

### render
This manager´s job is to draw everything that is visible on the canvas.

### box2d
Is a wrapper of the Erin box2dweb library that manage the physics of your game.
