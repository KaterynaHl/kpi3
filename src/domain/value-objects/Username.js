const DomainError = require("../errors/DomainError");

class Username {
  constructor(value) {
    if (!value || value.length < 3) {
      throw new DomainError("Username must contain at least 3 characters");
    }

    this.value = value;
    Object.freeze(this);
  }
}

module.exports = Username;