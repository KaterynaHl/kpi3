class GetPostsQuery {
    constructor({ limit = 20, offset = 0 } = {}) {
      this.limit = Number(limit);
      this.offset = Number(offset);
    }
  }
  
  module.exports = GetPostsQuery;