const socket = io();

const createBtn =
document.getElementById("createBtn");

const joinBtn =
document.getElementById("joinBtn");

const roomInfo =
document.getElementById("roomInfo");

const playerList =
document.getElementById("playerList");

createBtn.onclick = () => {

  const playerName =
    document.getElementById("playerName").value;

  socket.emit(
    "createRoom",
    playerName || "名無し"
  );
};

joinBtn.onclick = () => {

  const roomCode =
    prompt("4桁ルームコード");

  const playerName =
    document.getElementById("playerName").value;

  socket.emit("joinRoom", {
    roomCode,
    playerName: playerName || "名無し"
  });
};

socket.on("roomCreated", roomCode => {

  roomInfo.innerHTML =
    `ルームコード: ${roomCode}`;
});

socket.on("playerList", players => {

  playerList.innerHTML = "";

  players.forEach(player => {

    const li =
      document.createElement("li");

    li.textContent = player.name;

    playerList.appendChild(li);
  });
});

socket.on(
  "errorMessage",
  message => alert(message)
);
