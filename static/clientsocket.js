roomid = document.getElementById("roomid").innerText;
const socket = io();
var peer = new Peer();
let globalid;
peer.on("open", (id) => {
  globalid = id;
  socket.emit("getroom", roomid, id);
});
//dds
socket.on("sendid", (userid) => {
  var getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  getUserMedia(
    { video: true, audio: true },
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
        let video2 = document.createElement("video");
        video2.id = globalid;
        addVideoStream(video2, remoteStream);
      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
});

setInterval(() => {
  console.log(globalid);
  console.log("heey");

  if (document.querySelectorAll(`[id='${globalid}']`).length > 1) {
    element = document.querySelectorAll(`[id='${globalid}']`);

    for (var i = 0; i < element.length; i++) {
      if (document.querySelectorAll(`[id='${globalid}']`).length < 2) {
        break;
      }
      element[i].remove();
    }
  }
}, 9000);

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

socket.on("getortherdata", (data, time) => {
  messagereciver(data, time);
});

function messagereciver(data, time) {
  if (data == "share") {
    player.seekTo(time, true);
    player.pauseVideo();
    player.playVideo();

    console.log(time);
  }
  if (data == "pause") {
    player.pauseVideo();
  }
  if (data == "play") {
    player.playVideo();
  }
}
