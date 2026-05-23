class CommentReadModel {
    constructor({ id, postId, authorId, content }) {
      this.id = id;
      this.postId = postId;
      this.authorId = authorId;
      this.content = content;
    }
  }
  
  module.exports = CommentReadModel;