# abr-player
Adaptive Streaming Player for testing your ABR streams.

<p align="center"><img src="src/assets/video.png"></img></p>

https://alfg.github.io/abr-player/

## Players
* Shaka Player
* HasPlayer.js
* Dash.js Reference Player

## Development
`abr-player` is built with [Vue.js](https://vuejs.org) and the APIs of each supported player.

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
docker build -t abr-player .
docker run -it -p 8080:80 --rm abr-player
```

* Load `http://localhost:8080/abr-player` in a web browser.

## Resources
* [Shaka Player](https://shaka-player-demo.appspot.com/docs/api/index.html)
* [HasPlayer.js](http://orange-opensource.github.io/hasplayer.js/development/doc/jsdoc/index.html)
* [dash.js](http://cdn.dashjs.org/latest/jsdoc/index.html)

## License
MIT