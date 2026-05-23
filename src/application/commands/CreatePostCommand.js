class CreatePostCommand {
    constructor({ authorId, content }) {
      this.authorId = authorId;
      this.content = content;
    }
  }
  
  module.exports = CreatePostCommand;