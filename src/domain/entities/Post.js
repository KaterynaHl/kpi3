const DomainError = require("../errors/DomainError");
const Comment = require("./Comment");

class Post {
  constructor({ id, authorId, content, comments = [], reactions = [] }) {
    this._id = id;
    this._authorId = authorId;
    this._content = content;
    this._comments = comments;
    this._reactions = reactions;
  }

  get id() {
    return this._id;
  }

  get authorId() {
    return this._authorId;
  }

  get content() {
    return this._content.value;
  }

  get comments() {
    return this._comments;
  }

  get likesCount() {
    return this._reactions.filter((r) => r.type === "like").length;
  }

  update(authorId, newContent) {
    if (this._authorId !== authorId) {
      throw new DomainError("Only author can update post");
    }

    this._content = newContent;
  }

  addComment({ id, authorId, content }) {
    const comment = new Comment({
      id,
      postId: this._id,
      authorId,
      content,
    });

    this._comments.push(comment);

    return comment;
  }

  like(userId) {
    const existingReaction = this._reactions.find((r) => r.userId === userId);

    if (existingReaction) {
      throw new DomainError("User already reacted to this post");
    }

    this._reactions.push({
      userId,
      type: "like",
    });
  }

  deleteBy(authorId) {
    if (this._authorId !== authorId) {
      throw new DomainError("Only author can delete post");
    }
  }
}

module.exports = Post;