const crypto = require("crypto");
const Post = require("../entities/Post");
const PostContent = require("../value-objects/PostContent");

class PostFactory {
  create({ authorId, content }) {
    return new Post({
      id: crypto.randomUUID(),
      authorId,
      content: new PostContent(content),
      comments: [],
      reactions: [],
    });
  }
}

module.exports = PostFactory;