# CueControl

To be used with [CueControlCloud](https://github.com/timmui/CueControlCloud).

Running
---
Currently this will only run with the Pebble app. 
To avoid using the Pebble app, simply add `update()` with your stock symbol of choice in `server.js`.

To set up the repo and run the program, enter the following into cammand line:

```
$ npm install
$ npm start
```

Open Source Software
---
|Name|Version|
|----|-------|
|[async](https://github.com/caolan/async)|2.1.2|
|[cue-sdk-node](https://github.com/Yannicked/node-cue-sdk)|1.2.0|
|[dotenv](https://github.com/motdotla/dotenv)|2.0.0|
|[express](https://github.com/expressjs/express)|4.14.0|
|[lodash](https://github.com/lodash/lodash)|3.10.1|
|[nodemon](https://github.com/remy/nodemon)|1.11.0|
|[request](https://github.com/request/request)|2.78.0|
|[request-promise](https://github.com/request/request-promise)|4.1.1|
|[sleep](https://github.com/erikdubbelboer/node-sleep)|5.0.0|
|[socket.io-client](https://github.com/socketio/socket.io-client)|1.5.1|
|[xml2json](https://github.com/buglabs/node-xml2json)|0.10.0|

Dev Notes
---
The Nasdaq API is not open source so you will not be able to make get requests. We are currently looking into using a different API.
