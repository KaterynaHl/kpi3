const NotFoundError = require("../../domain/errors/NotFoundError");
const PostLikedEvent = require("../../domain/events/PostLikedEvent");

class LikePostCommandHandler {
  constructor(postRepository, eventBus) {
    this.postRepository = postRepository;
    this.eventBus = eventBus;
  }

  async handle(command) {
    const post = await this.postRepository.findById(command.postId);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    post.like(command.userId);

    await this.postRepository.save(post);

    await this.eventBus.publish(
      new PostLikedEvent({
        postId: post.id,
        userId: command.userId,
      })
    );
  }
}

module.exports = LikePostCommandHandler;