# nonameJS

nonameJS want to be a 2d game engine based on web technologies.


## Make a new Game

To make a new functional game you need at least:

* one state:
* one html5 canvas element to render the state.


The game class takes a configuration array as parameter. If a necessary
configuration property is not given the game will not start and the console will
warn you.

```html
<div class="screen"></div>
```

```javascript
var game = new noname.game({
    screen: document.querySelector('.screen'),
    fps: 30,
    dps: 30,
    states: [mapState, loopState],
    initialState: 'loopState'
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
            <td> [mapState, loopState]</td>
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
            <td> 'loopState'</td>
        </tr>
    </tbody>
</table>
