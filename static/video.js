var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("videoplayer", {
    height: "390",
    width: "640",
    videoId: "2BS8tkCikXA", // this will change video id
    playerVars: {
      playsinline: 1,
    },
  });
}

let lasttime;
let nowtime;

function getcurrentTime() {
  console.log(player.getCurrentTime());
}

function setcurrentTime(time) {
  player.seekTo(time, true);
}

share = document.getElementById("share");
share.addEventListener("click", () => {
  nowtime = player.getCurrentTime();
  nowtime = player.seekTo(nowtime, true);
  nowtime = player.getCurrentTime();
  console.log("thiiis sending now time:" + nowtime);
  senddata("share", nowtime);
  player.pauseVideo();
  player.playVideo();
});

pause = document.getElementById("pause");
pause.addEventListener("click", () => {
  player.pauseVideo();
  senddata("pause", null);
});

playz = document.getElementById("play");
playz.addEventListener("click", () => {
  player.playVideo();

  senddata("play", null);
});

function senddata(userevent, time) {
  socket.emit("ortherdata", roomid, userevent, time);
}
