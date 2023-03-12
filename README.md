# simple-web-app
A simple single page application.

## Dependencies
* Node.js
* Webpack
* Express
* Navigo

## Docker
Image: https://hub.docker.com/r/niiicolaidk/simple-web-app

### Run production
```
$ docker run -p 443:443 -p 80:80 -v /ssl:/ssl niiicolaidk/simple-web-app:release-1.0
```

### Run development
```
$ docker run -p 3000:3000 niiicolaidk/simple-web-app:development-1.0
```
