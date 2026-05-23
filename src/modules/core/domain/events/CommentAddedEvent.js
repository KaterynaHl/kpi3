class CommentAddedEvent {
    constructor({ postId, commentId, authorId, content }) {
      this.eventName = "CommentAdded";
      this.postId = postId;
      this.commentId = commentId;
      this.authorId = authorId;
      this.content = content;
  
      Object.freeze(this);
    }
  }
  
  module.exports = CommentAddedEvent;