const express = require("express");
const app = express();

const server = require("http").createServer(app);
const { Server } = require("socket.io")(server);

const io = new Server(server);

//routes
app.get("/", (req, res) => {
    res.send("This is mern realtime board sharing application");
});

io.on("connection", (socket) => {
    console.log("User Connected");
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log("server is running on 9000"));