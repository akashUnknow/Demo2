const express = require("express");
const jwkToPem = require("jwk-to-pem");
const cors = require("cors");

const app = express();

app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: "https://didactic-capybara-r46g55rq6w7gh57xq-5173.app.github.dev", 
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

app.get("/", (req, res) => {
  res.send("JWK to PEM Converter API is running");
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
