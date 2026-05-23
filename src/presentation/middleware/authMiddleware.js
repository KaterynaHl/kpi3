const { tokenService } = require("../../container");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = tokenService.verify(token);
    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;