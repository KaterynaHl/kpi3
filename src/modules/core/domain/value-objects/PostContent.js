const DomainError = require("../errors/DomainError");
  
  class PostContent {
    constructor(value) {
      if (
        !value ||
        value.trim().length === 0
      ) {
        throw new DomainError(
          "Post content cannot be empty"
        );
      }
  
      if (value.length > 500) {
        throw new DomainError(
          "Post content is too long"
        );
      }
  
      this.value = value.trim();
  
      Object.freeze(this);
    }
  
    toString() {
      return this.value;
    }
  }
  
  module.exports = PostContent;