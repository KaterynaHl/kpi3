class PostMetric {
    constructor({ postId, authorId, contentLength }) {
      this.postId = postId;
      this.authorId = authorId;
      this.contentLength = contentLength;
      this.likesCount = 0;
      this.commentsCount = 0;
    }
  
    recordLike() {
      this.likesCount += 1;
    }
  
    recordComment() {
      this.commentsCount += 1;
    }
  }
  
  module.exports = PostMetric;