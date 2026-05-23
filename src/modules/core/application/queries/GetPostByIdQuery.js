class GetPostByIdQuery {
    constructor({ postId }) {
      this.postId = postId;
  
      Object.freeze(this);
    }
  }
  
  module.exports = GetPostByIdQuery;