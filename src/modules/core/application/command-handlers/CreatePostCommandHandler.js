const PostCreatedEvent = require("../../domain/events/PostCreatedEvent");

class CreatePostCommandHandler {
  constructor(postFactory, postRepository, notificationService, eventBus = null) {
    this.postFactory = postFactory;
    this.postRepository = postRepository;
    this.notificationService = notificationService;
    this.eventBus = eventBus;
  }

  async handle(command) {
    const post = this.postFactory.create({
      authorId: command.authorId,
      content: command.content,
    });

    await this.postRepository.save(post);

    await this.notificationService.send({
      type: "POST_CREATED",
      postId: post.id,
    });

    if (this.eventBus) {
      await this.eventBus.publish(
        new PostCreatedEvent({
          postId: post.id,
          authorId: post.authorId,
          content: post.content,
        })
      );
    }

    return {
      postId: post.id,
    };
  }
}

module.exports = CreatePostCommandHandler;