class GetPostsQueryHandler {
    constructor(postReadRepository) {
      this.postReadRepository = postReadRepository;
    }
  
    async handle(query) {
      return this.postReadRepository.findAll(query);
    }
  }
  
  module.exports = GetPostsQueryHandler;