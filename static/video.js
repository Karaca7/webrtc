/*
class Videoplayer {
  constructor() {
    this.tag = document.createElement("script");
    this.tag.src = "https://www.youtube.com/iframe_api";
    this.firstScriptTag = document.getElementsByTagName("script")[0];
    this.firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player("videoplayer", {
          height: "390",
          width: "640",
          videoId: "nqabWPd90bU", // this will change
          playerVars: {
            playsinline: 1,
          },
        });
      }

  }

   gettime() {
    player.getCurrentTime();
  }
  
   settime(time) {
    player.setCurrentTime(time, true);
  }
}
*/
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
let now;

function getcurrentTime() {
  // console.log(player.getDuration())  total

  console.log(player.getCurrentTime());
}

function setcurrentTime(time) {
  player.seekTo(time, true);
}
buton = document.getElementById("senddata");
buton.addEventListener("click", () => {
  senddata();
});
function senddata() {
  nowtime = player.getCurrentTime();
  nowtime = player.seekTo(nowtime, true);
  nowtime = player.getCurrentTime();

  socket.emit("ortherdata", roomid, nowtime);
  player.pauseVideo();
  player.playVideo();
}
