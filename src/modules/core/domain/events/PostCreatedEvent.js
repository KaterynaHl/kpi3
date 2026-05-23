class PostCreatedEvent {
    constructor({
      postId,
      authorId,
      content,
    }) {
      this.eventName =
        "PostCreated";
  
      this.postId = postId;
  
      this.authorId = authorId;
  
      this.content = content;
  
      Object.freeze(this);
    }
  }
  
  module.exports = PostCreatedEvent;