class CreatePostUseCase {
    constructor(postFactory, postRepository) {
      this.postFactory = postFactory;
      this.postRepository = postRepository;
    }
  
    async execute(dto) {
      const post = this.postFactory.create(dto);
  
      await this.postRepository.save(post);
  
      return post;
    }
  }
  
  module.exports = CreatePostUseCase;