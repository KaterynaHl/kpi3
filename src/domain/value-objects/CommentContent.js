const DomainError = require("../errors/DomainError");

class CommentContent {
  constructor(value) {
    if (!value || value.trim().length < 1) {
      throw new DomainError("Comment cannot be empty");
    }

    this.value = value.trim();
    Object.freeze(this);
  }
}

module.exports = CommentContent;