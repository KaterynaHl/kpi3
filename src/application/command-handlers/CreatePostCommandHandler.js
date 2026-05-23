const PostCreatedEvent = require(
    "../../domain/events/PostCreatedEvent"
  );
  
  class CreatePostCommandHandler {
    constructor(
      postFactory,
      postRepository,
      notificationService,
      eventBus
    ) {
      this.postFactory = postFactory;
      this.postRepository = postRepository;
      this.notificationService = notificationService;
      this.eventBus = eventBus;
    }
  
    async handle(command) {
      const post =
        this.postFactory.create(command);
  
      await this.postRepository.save(post);
  
      // synchronous communication
      await this.notificationService.send({
        type: "POST_CREATED",
        message: `Post ${post.id} created`,
      });
  
      // asynchronous communication
      await this.eventBus.publish(
        new PostCreatedEvent({
          postId: post.id,
          authorId: post.authorId,
          content: post.content,
        })
      );
  
      return post.id;
    }
  }
  
  module.exports = CreatePostCommandHandler;