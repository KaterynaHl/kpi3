const NotFoundError = require("../../domain/errors/NotFoundError");

class LikePostCommandHandler {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async handle(command) {
    const post = await this.postRepository.findById(command.postId);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    post.like(command.userId);

    await this.postRepository.save(post);
  }
}

module.exports = LikePostCommandHandler;