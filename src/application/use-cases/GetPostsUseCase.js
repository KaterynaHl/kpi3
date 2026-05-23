class GetPostsUseCase {
    constructor(postRepository) {
      this.postRepository = postRepository;
    }
  
    async execute() {
      return this.postRepository.findAll();
    }
  }
  
  module.exports = GetPostsUseCase;