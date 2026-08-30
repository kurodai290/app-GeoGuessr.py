const map = L.map("map").setView([35.681236, 139.767125], 2);

L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap"
    }
).addTo(map);

let guessMarker = null;

map.on("click", (e) => {

    if (guessMarker) {
        map.removeLayer(guessMarker);
    }

    guessMarker = L.marker(e.latlng).addTo(map);
});

const answer = {
    lat: 35.681236,
    lng: 139.767125
};

document
.getElementById("guessBtn")
.addEventListener("click", () => {

    if (!guessMarker) {
        alert("地図をクリックしてください");
        return;
    }

    const guess = guessMarker.getLatLng();

    const distance =
        map.distance(
            [guess.lat, guess.lng],
            [answer.lat, answer.lng]
        ) / 1000;

    document.getElementById("result").textContent =
        `距離: ${distance.toFixed(1)} km`;
});
