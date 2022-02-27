const express = require("express");
let app = express();

app.set("view engine", "ejs");
app.set("views", "Views");

app.use("/static", express.static("static"));

var cors = require("cors");

app.use(cors());

///
let http = require("http");

let Serverapp = http.createServer(app);

let { Server } = require("socket.io");
///
let io = new Server(Serverapp);

app.get("/", (req, res) => {
  res.render("index");
});

const { v4: uuidv4 } = require("uuid");
app.get("/redirectToRoom", (req, res) => {
  res.redirect(`/room/${uuidv4()}`);
});
app.get("/room/:id", (req, res) => {
  res.render("room", { roomid: req.params.id });
});

//start socket father
io.on("connection", (socket) => {
  console.log("new socket fatheer");

  socket.on("getroom", (roomid, userid) => {
    // console.log("userid:" + userid);
    // console.log("room:" + roomid);
    socket.join(roomid);
    io.sockets.in(roomid).emit("sendid", userid);
  });

  socket.on("ortherdata", (roomid, ortherdata) => {
    console.log(ortherdata);
    console.log("roomid:" + roomid);
    io.sockets.in(roomid).emit("getortherdata", ortherdata);
  });
});

let PORT = process.env.PORT || 8080;
Serverapp.listen(PORT);
