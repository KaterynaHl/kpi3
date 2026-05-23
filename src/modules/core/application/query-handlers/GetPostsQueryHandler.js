class GetPostsQueryHandler {
    constructor(postReadRepository) {
      this.postReadRepository =
        postReadRepository;
    }
  
    async handle(query) {
      return this.postReadRepository.findAll({
        limit: query.limit,
        offset: query.offset,
      });
    }
  }
  
  module.exports = GetPostsQueryHandler;