const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route
app.post("/api/signup", (req, res) => {
  console.log("Received data:", req.body);
  const { username, password, email, phone } = req.body;
  const newUser = { id: Date.now(), username, password, email, phone};

  let users = [];

  // Read existing users if file exists
  if (fs.existsSync("users.json")) {
    const raw = fs.readFileSync("users.json");
    users = JSON.parse(raw);
  }

  users.push(newUser);

  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

  res.json({ message: "User registered successfully!", user: newUser });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
