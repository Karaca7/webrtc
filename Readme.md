# Real Time Communication

The feature I want to see on the patika, you may want to learn with your friends from a distance. We use "RTC" technologies for this. Current features. user video and audio sharing . watch video with friend feature.
https://demowebrtcapp.herokuapp.com/ --> you can try
video for better understanding --> https://www.youtube.com/watch?v=LbFPlam-FIE

## Note 1

This demo does not include the ability to connect you directly to someone else. for this you have to manually share the url address after you set up the room.

## Note 2

When you run it in developer mode

in your browser
need to turn off the enable javascript source maps setting to avoid the error related to peer js.

## Folder structure

```bash
webrtc/

├─ node_modules/
├─ Views/
│  ├─ index.ejs
│  ├─ room.ejs
├─ static/
│  ├─ clientsocket.js
│  ├─ video.js
├─app.js
├─ .gitignore
├─ package.json


```

## Installation

github clone and github download zip

## Dependencies Install

```bash
npm install --save

```

## Requirements

```bash
 "cors": "^2.8.5",
    "ejs": "^3.1.6",
    "express": "^4.17.3",
    "peer": "^0.6.1",
    "socket.io": "^4.4.1",
    "uuid": "^8.3.2"

```

## CDN Dependencies :

peer js cdn --> https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js

and running

````

## Usage //runing is here!

```javascript
node app.js
or
nodemon app.js -- requires  npm i nodemon --save

````

## Next Version

0. An invitation link will be sent for the new user to join the room.
1. Pause, play (in-group)
2. All colleagues' scores will be transferred when they complete the lesson.
3. audio and video on, off.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
