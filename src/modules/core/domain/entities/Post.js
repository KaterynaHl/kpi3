const DomainError = require("../errors/DomainError");
const Comment = require("./Comment");

class Post {
  constructor({
    id,
    authorId,
    content,
    likes = [],
    comments = [],
    createdAt = new Date(),
  }) {
    this.id = id;
    this.authorId = authorId;
    this.content = content.toString();
    this.likes = likes;
    this.comments = comments;
    this.createdAt = createdAt;
  }

  update(authorId, content) {
    if (this.authorId !== authorId) {
      throw new DomainError("Only author can update post");
    }

    this.content = content.toString();
  }

  like(userId) {
    if (this.likes.includes(userId)) {
      throw new DomainError("User already liked this post");
    }

    this.likes.push(userId);
  }

  addComment({ id, authorId, content }) {
    const comment = new Comment({ id, authorId, content });

    this.comments.push(comment);
    return comment;
  }
}

module.exports = Post;