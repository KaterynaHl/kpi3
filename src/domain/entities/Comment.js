class Comment {
    constructor({ id, postId, authorId, content }) {
      this._id = id;
      this._postId = postId;
      this._authorId = authorId;
      this._content = content;
    }
  
    get id() {
      return this._id;
    }
  
    get postId() {
      return this._postId;
    }
  
    get authorId() {
      return this._authorId;
    }
  
    get content() {
      return this._content.value;
    }
  
    update(content) {
      this._content = content;
    }
  }
  
  module.exports = Comment;