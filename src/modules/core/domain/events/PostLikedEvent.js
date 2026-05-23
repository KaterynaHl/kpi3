class PostLikedEvent {
    constructor({ postId, userId }) {
      this.eventName = "PostLiked";
      this.postId = postId;
      this.userId = userId;
  
      Object.freeze(this);
    }
  }
  
  module.exports = PostLikedEvent;