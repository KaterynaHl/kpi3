const DomainError = require("../errors/DomainError");

class Email {
  constructor(value) {
    if (!value || !value.includes("@")) {
      throw new DomainError("Invalid email");
    }

    this.value = value.toLowerCase();
    Object.freeze(this);
  }

  equals(other) {
    return other instanceof Email && this.value === other.value;
  }
}

module.exports = Email;