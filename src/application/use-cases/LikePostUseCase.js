const NotFoundError = require("../../domain/errors/NotFoundError");

class LikePostUseCase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute({ postId, userId }) {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    post.like(userId);

    await this.postRepository.save(post);

    return post;
  }
}

module.exports = LikePostUseCase;