class AddCommentCommand {
    constructor({
      postId,
      authorId,
      content,
    }) {
      this.postId = postId;
      this.authorId = authorId;
      this.content = content;
  
      Object.freeze(this);
    }
  }
  
  module.exports = AddCommentCommand;