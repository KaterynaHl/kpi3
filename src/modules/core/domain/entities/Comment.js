class Comment {
    constructor({
      id,
      authorId,
      content,
      createdAt = new Date(),
    }) {
      this.id = id;
      this.authorId = authorId;
      this.content = content.toString();
      this.createdAt = createdAt;
    }
  }
  
  module.exports = Comment;