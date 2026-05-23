class PostCreatedNotificationHandler {
    constructor(notificationService) {
      this.notificationService = notificationService;
    }
  
    async handle(event) {
      await this.notificationService.send({
        type: "POST_CREATED_ASYNC",
        message: `Async notification for post ${event.postId}`,
      });
    }
  }
  
  module.exports = PostCreatedNotificationHandler;