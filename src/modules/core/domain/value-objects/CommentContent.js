const DomainError = require("../errors/DomainError");
  
  class CommentContent {
    constructor(value) {
      if (
        !value ||
        value.trim().length === 0
      ) {
        throw new DomainError(
          "Comment content cannot be empty"
        );
      }
  
      this.value = value.trim();
  
      Object.freeze(this);
    }
  
    toString() {
      return this.value;
    }
  }
  
  module.exports = CommentContent;