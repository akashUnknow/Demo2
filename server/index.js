const express = require("express");
const jwkToPem = require("jwk-to-pem");
const cors = require("cors");
const { generateToken } = require("./jwtService");

const app = express();
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);


app.post("/convert", (req, res) => {
  try {
    const jwk = req.body;
    const pem = jwkToPem(jwk);
    res.json({ pem });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.post("/token", (req, res) => {
  try {
    const { username, key } = req.body; 
    if (!username || !key) {
      return res.status(400).json({ error: "username and key are required" });
    }

    const token = generateToken(username, key);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("JWK to PEM Converter & JWT API is running");
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
