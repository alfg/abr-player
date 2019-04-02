# vue-player
> Adaptive Streaming Test Player 

<p align="center"><img src="src/assets/video.png"></img></p>

https://alfg.github.io/vue-player/

## Players
* Shaka Player
* HasPlayer.js
* Dash.js Reference Player

## TODO
* More players and player functionality.

## Development
`vue-player` is built with [Vue.js](https://vuejs.org) and the APIs of each supported player.

* [Shaka Player](https://shaka-player-demo.appspot.com/docs/api/index.html)
* [HasPlayer.js](http://orange-opensource.github.io/hasplayer.js/development/doc/jsdoc/index.html)
* [dash.js](http://cdn.dashjs.org/latest/jsdoc/index.html)

### Install
```
npm install
npm run serve
```
* Load `http://localhost:8080/` in the web browser.

### Compiles and minifies for production
```
npm run build
```

### Deploy
Deploys to [Github Pages](https://pages.github.com/)
```
npm run deploy
```

### Docker
```
docker build -t vue-player .
docker run -it -p 8080:80 --rm vue-player
```

* Load `http://localhost:8080/vue-player` in a web browser.

## Resources
* [Shaka Player](https://shaka-player-demo.appspot.com/docs/api/index.html)
* [HasPlayer.js](http://orange-opensource.github.io/hasplayer.js/development/doc/jsdoc/index.html)
* [dash.js](http://cdn.dashjs.org/latest/jsdoc/index.html)

## License
MIT