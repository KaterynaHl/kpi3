class PostReadModel {
    constructor({ id, authorId, content, likesCount, comments }) {
      this.id = id;
      this.authorId = authorId;
      this.content = content;
      this.likesCount = likesCount;
      this.comments = comments;
    }
  }
  
  module.exports = PostReadModel;