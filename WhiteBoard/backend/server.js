const express = require("express");
const app = express();

const server = require("http").createServer(app);
const { Server } = require("socket.io");
const { addUser, getUser, removeUser } = require("./utils/users");
const { removeListener } = require("process");

const io = new Server(server);

//routes
app.get("/", (req, res) => {
    res.send("This is mern realtime board sharing application");
});

let roomIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
    socket.on("userJoined", (data) => {
        const { name, userId, roomId, host, presenter } = data;
        roomIdGlobal = roomId;
        socket.join(roomId);
        const users = addUser({ name, userId, roomId, host, presenter, socketId: socket.id });
        socket.emit("userIsJoined", { success: true, users });
        socket.broadcast.to(roomId).emit("userJoinedMessageBroadcasted", name)
        socket.broadcast.to(roomId).emit("showallusers", users);
        socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
            imgURL: imgURLGlobal,
        })
    });

    socket.on("message", (data) => {
        const { message } = data;
        const user = getUser(socket.id);
        if (user) {
            removeUser(socket.id);
            socket.broadcast
            socket.broadcast.to(roomIdGlobal).emit("messageResponse", { message, name: user.name });
        }
    })

    socket.on("disconnect", () => {
        console.log("disconnected");
        const user = getUser(socket.id);
        if (user) {
            removeUser(socket.id);
            socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadcasted", user.name);
        }
    })

    socket.on("whiteboardData", (data) => {
        imgURLGlobal = data;
        socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
            imgURL: data,
        })
    });
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log("server is running on 9000"));