const DomainError = require("../../domain/errors/DomainError");
const NotFoundError = require("../../domain/errors/NotFoundError");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({
      message: err.message,
    });
  }

  if (err instanceof DomainError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};

module.exports = errorMiddleware;