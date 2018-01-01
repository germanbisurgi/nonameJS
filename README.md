# nonameJS

nonameJS want to be a 2d game engine based on web technologies.

## Make a new Game

To make a new functional game you need at least:

* one state: An object that allows the developer an easy way to manage loading
assets to a game and also manage the logic of a game
* one html5 canvas element to render the state.

The game class takes a configuration array as parameter. If a necessary
configuration property is not given the game will not start and the console will
warn you.

```html
<canvas class="game-canvas"></canvas>
```

```javascript
var game = new noname.game({
    canvas: document.querySelector('.game-canvas'),
    states: [testState],
    initialState: 'testState',
    fps: 1
});
```

<table>
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
            <th>Default Value</th>
            <th>Required</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>canvas</td>
            <td>The canvas element that will be used to render the game</td>
            <td> - </td>
            <td> yes </td>
        </tr>
        <tr>
            <td>states</td>
            <td>A states array the the game can use</td>
            <td> - </td>
            <td> yes </td>
        </tr>
        <tr>
            <td>initialState</td>
            <td>wich state will be loaded first</td>
            <td> - </td>
            <td> no </td>
        </tr>
        <tr>
            <td>fps</td>
            <td>The loop Frames per second</td>
            <td> 60 </td>
            <td> no </td>
        </tr>
    </tbody>
</table>
