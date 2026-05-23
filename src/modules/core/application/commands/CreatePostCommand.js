class CreatePostCommand {
    constructor({
      authorId,
      content,
    }) {
      this.authorId = authorId;
      this.content = content;
  
      Object.freeze(this);
    }
  }
  
  module.exports = CreatePostCommand;