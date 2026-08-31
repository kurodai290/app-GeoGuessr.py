const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const rooms = {};

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

function generateRoomCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

io.on("connection", (socket) => {

  socket.on("createRoom", (playerName) => {

    let roomCode;

    do {
      roomCode = generateRoomCode();
    } while (rooms[roomCode]);

    rooms[roomCode] = {
      players: []
    };

    rooms[roomCode].players.push({
      id: socket.id,
      name: playerName
    });

    socket.join(roomCode);

    socket.emit("roomCreated", roomCode);

    io.to(roomCode).emit(
      "playerList",
      rooms[roomCode].players
    );
  });

  socket.on("joinRoom", ({ roomCode, playerName }) => {

    if (!rooms[roomCode]) {
      socket.emit("errorMessage", "ルームが存在しません");
      return;
    }

    if (rooms[roomCode].players.length >= 4) {
      socket.emit("errorMessage", "満員です");
      return;
    }

    rooms[roomCode].players.push({
      id: socket.id,
      name: playerName
    });

    socket.join(roomCode);

    io.to(roomCode).emit(
      "playerList",
      rooms[roomCode].players
    );
  });

  socket.on("disconnect", () => {

    for (const roomCode in rooms) {

      rooms[roomCode].players =
        rooms[roomCode].players.filter(
          p => p.id !== socket.id
        );

      io.to(roomCode).emit(
        "playerList",
        rooms[roomCode].players
      );

      if (
        rooms[roomCode].players.length === 0
      ) {
        delete rooms[roomCode];
      }
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
