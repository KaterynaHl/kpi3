const CreatePostCommand = require("../../src/modules/core/application/commands/CreatePostCommand");
const CreatePostCommandHandler = require("../../src/modules/core/application/command-handlers/CreatePostCommandHandler");
const PostFactory = require("../../src/modules/core/domain/factories/PostFactory");

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

class FakeEventBus {
  publish() {}
}

describe("Sync communication", () => {
  test("handler sends notification synchronously", async () => {
    const repository = new FakeRepository();
    const notificationService = new FakeNotificationService();

    const handler = new CreatePostCommandHandler(
      new PostFactory(),
      repository,
      notificationService,
      new FakeEventBus()
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