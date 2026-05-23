class CommentReadModel {
    constructor({
      id,
      authorId,
      content,
      createdAt,
    }) {
      this.id = id;
      this.authorId = authorId;
      this.content = content;
      this.createdAt = createdAt;
  
      Object.freeze(this);
    }
  }
  
  module.exports = CommentReadModel;