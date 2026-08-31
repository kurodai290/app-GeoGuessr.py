const createBtn =
document.getElementById("createBtn");

const joinBtn =
document.getElementById("joinBtn");

createBtn.addEventListener("click", () => {

    const roomCode =
    Math.floor(
        1000 + Math.random() * 9000
    );

    alert(
        "ルームコード：" + roomCode
    );

});

joinBtn.addEventListener("click", () => {

    const roomCode =
    prompt(
        "ルームコードを入力"
    );

    if(roomCode){

        alert(
            roomCode +
            " に参加します"
        );

    }

});
