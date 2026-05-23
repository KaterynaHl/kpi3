const jwt = require("jsonwebtoken");

class TokenService {
  sign(payload) {
    return jwt.sign(payload, "secretkey");
  }

  verify(token) {
    return jwt.verify(token, "secretkey");
  }
}

module.exports = TokenService;