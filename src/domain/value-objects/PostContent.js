const DomainError = require("../errors/DomainError");

class PostContent {
  constructor(value) {
    if (!value || value.trim().length < 3) {
      throw new DomainError("Post content must contain at least 3 characters");
    }

    if (value.length > 280) {
      throw new DomainError("Post content cannot be longer than 280 characters");
    }

    this.value = value.trim();
    Object.freeze(this);
  }
}

module.exports = PostContent;