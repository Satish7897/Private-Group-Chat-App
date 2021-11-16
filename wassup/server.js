const express = require("express");
const app = express();
const path = require("path");
const http = require("http").createServer(app);
const PORT = process.env.PORT || 5000;

http.listen(PORT, (req, res) => {
  console.log("listening");
});
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("connected....");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
