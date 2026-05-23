const CommentReadModel = require("./CommentReadModel");
  
  class PostReadModel {
    constructor({
      id,
      authorId,
      content,
      likes,
      comments,
      createdAt,
    }) {
      this.id = id;
  
      this.authorId = authorId;
  
      this.content = content;
  
      this.likes = likes;
  
      this.comments = comments.map(
        (comment) =>
          new CommentReadModel(comment)
      );
  
      this.createdAt = createdAt;
  
      Object.freeze(this);
    }
  }
  
  module.exports = PostReadModel;