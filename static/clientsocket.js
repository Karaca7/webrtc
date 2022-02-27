roomid = document.getElementById("roomid").innerText;
const socket = io();
var peer = new Peer();
console.log("1");
peer.on("open", (id) => {
  socket.emit("getroom", roomid, id);
});

socket.on("sendid", (userid) => {
  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
  getUserMedia(
    { video: true, audio: false },
    function (stream) {
      let localv = document.getElementById("myvideo");
      addVideoStream(localv, stream);
      var call = peer.call(userid, stream);
      call.on("stream", function (remoteStream) {
        let video = document.createElement("video");

        addVideoStream(video, remoteStream);
      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
});

var getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
peer.on("call", function (call) {
  //it is mee
  getUserMedia(
    { video: true, audio: true },
    function (stream) {
      call.answer(stream); // Answer the call with an A/V stream.
      call.on("stream", function (remoteStream) {
        let video = document.createElement("video");
        let remotev = document.getElementById("remote");

        addVideoStream(video, remoteStream);
      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
});

console.log("2");
videoGrid = document.getElementById("videoGrid");
function addVideoStream(video, stream) {
  video.srcObject = stream; // video objesini stream le bağladık.
  video.addEventListener("loadedmetadata", () => {
    // data yüklendiinde
    // video yu başlat
    video.play();
  });
  videoGrid.append(video); // Append video element to videoGrid
}

senddata = document.getElementById("senddata");
textingdata = document.getElementById("textingdata");

// senddata.addEventListener("click", () => {
//   socket.emit("ortherdata", roomid, textingdata.value);
//   // console.log(textingdata.value);
// });

socket.on("getortherdata", (data) => {
  console.log(data);
  player.seekTo(data, true);
  player.pauseVideo();
  player.playVideo();
});
