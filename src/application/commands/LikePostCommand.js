class LikePostCommand {
    constructor({ postId, userId }) {
      this.postId = postId;
      this.userId = userId;
    }
  }
  
  module.exports = LikePostCommand;