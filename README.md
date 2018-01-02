# nonameJS

nonameJS want to be a 2d game engine based on web technologies.


## Make a new Game

To make a nonameJS game you need at least two things:

1) an HTML element to contain the game canvas.

```html
<div class="screen"></div>
```

2) A game state: an object that allow the developer to split the logic of a game and manage assets loading.

```javascript
var myState = new noname.state('myState');

myState.preload = function () {
    // this code will allow you can put load your assets (images, audio, ecc)
};

myState.loading = function () {
    // this code will be running while the game is loading assets
};

myState.create = function () {
    // this code allows you to create your game objects
}

myState.update = function () {
    // this code will execute the logic behin your game
};
```

The game class takes a configuration array as parameter. If a necessary
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
