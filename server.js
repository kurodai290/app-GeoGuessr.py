const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// frontend を公開
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/status", (req, res) => {
  res.json({
    status: "online",
    game: "チャリゲッサー"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
