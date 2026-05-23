const CreatePostCommand = require("../../src/application/commands/CreatePostCommand");
const CreatePostCommandHandler = require("../../src/application/command-handlers/CreatePostCommandHandler");
const PostFactory = require("../../src/domain/factories/PostFactory");

class FakeRepository {
  constructor() {
    this.posts = [];
  }

  async save(post) {
    this.posts.push(post);
  }
}

class FakeNotificationService {
  constructor() {
    this.notifications = [];
  }

  async send(notification) {
    this.notifications.push(notification);
  }
}

describe("Sync communication", () => {
  test("handler sends notification synchronously", async () => {
    const repository = new FakeRepository();
    const notificationService = new FakeNotificationService();

    const handler = new CreatePostCommandHandler(
      new PostFactory(),
      repository,
      notificationService,
      { publish: async () => {} }
    );

    await handler.handle(
      new CreatePostCommand({
        authorId: "user-1",
        content: "sync test",
      })
    );

    expect(notificationService.notifications.length).toBe(1);
  });
});