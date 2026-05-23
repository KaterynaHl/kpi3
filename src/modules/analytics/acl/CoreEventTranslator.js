const PostMetric = require("../domain/entities/PostMetric");

class CoreEventTranslator {
  toPostMetric(event) {
    return new PostMetric({
      postId: event.postId,
      authorId: event.authorId,
      contentLength: event.content.length,
    });
  }
}

module.exports = CoreEventTranslator;