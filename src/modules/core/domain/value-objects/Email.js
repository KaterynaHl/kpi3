const DomainError = require("../errors/DomainError");
  
  class Email {
    constructor(value) {
      const normalized =
        value.trim().toLowerCase();
  
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (
        !emailRegex.test(normalized)
      ) {
        throw new DomainError(
          "Invalid email"
        );
      }
  
      this.value = normalized;
  
      Object.freeze(this);
    }
  
    toString() {
      return this.value;
    }
  }
  
  module.exports = Email;