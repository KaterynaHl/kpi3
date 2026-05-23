const NotFoundError = require(
    "../../domain/errors/NotFoundError"
  );
  
  class GetPostByIdQueryHandler {
    constructor(postReadRepository) {
      this.postReadRepository =
        postReadRepository;
    }
  
    async handle(query) {
      const post =
        await this.postReadRepository.findById(
          query.postId
        );
  
      if (!post) {
        throw new NotFoundError(
          "Post not found"
        );
      }
  
      return post;
    }
  }
  
  module.exports = GetPostByIdQueryHandler;