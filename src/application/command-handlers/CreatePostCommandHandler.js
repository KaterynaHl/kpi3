class CreatePostCommandHandler {
    constructor(postFactory, postRepository) {
      this.postFactory = postFactory;
      this.postRepository = postRepository;
    }
  
    async handle(command) {
      const post = this.postFactory.create(command);
      await this.postRepository.save(post);
  
      return post.id;
    }
  }
  
  module.exports = CreatePostCommandHandler;