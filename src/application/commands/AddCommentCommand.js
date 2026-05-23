class AddCommentCommand {
    constructor({ postId, authorId, content }) {
      this.postId = postId;
      this.authorId = authorId;
      this.content = content;
    }
  }
  
  module.exports = AddCommentCommand;