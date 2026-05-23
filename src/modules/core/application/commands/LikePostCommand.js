class LikePostCommand {
    constructor({
      postId,
      userId,
    }) {
      this.postId = postId;
      this.userId = userId;
  
      Object.freeze(this);
    }
  }
  
  module.exports = LikePostCommand;