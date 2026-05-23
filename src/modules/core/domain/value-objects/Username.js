const DomainError = require("../errors/DomainError");
  
  class Username {
    constructor(value) {
      const normalized =
        value.trim();
  
      if (
        normalized.length < 3
      ) {
        throw new DomainError(
          "Username too short"
        );
      }
  
      this.value = normalized;
  
      Object.freeze(this);
    }
  
    toString() {
      return this.value;
    }
  }
  
  module.exports = Username;