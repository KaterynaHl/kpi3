const DomainError = require("./DomainError");

class NotFoundError extends DomainError {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
  }
}

module.exports = NotFoundError;