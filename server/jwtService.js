
const jwt = require("jsonwebtoken");


function generateToken(username, secretKey) {
  if (!username || !secretKey) {
    throw new Error("Username and secretKey are required");
  }

  const payload = { username };
  const options = { expiresIn: "1h" }; 

  return jwt.sign(payload, secretKey, options);
}

module.exports = { generateToken };
