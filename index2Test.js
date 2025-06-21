const express = require("express");
const app = express();
const PORT = 3006;

app.use(express.json()); // Use only express.json()

app.post("/webhook", (req, res) => {
  console.log("📩 Raw Body:", req.body); // Just log it
  res.status(200).json({ message: "Parsed Successfully", body: req.body });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
