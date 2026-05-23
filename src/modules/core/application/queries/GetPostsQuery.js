class GetPostsQuery {
    constructor({
      limit = 10,
      offset = 0,
    } = {}) {
      this.limit = Number(limit);
      this.offset = Number(offset);
  
      Object.freeze(this);
    }
  }
  
  module.exports = GetPostsQuery;