const CreatePostCommand = require("../../src/application/commands/CreatePostCommand");
const CreatePostCommandHandler = require("../../src/application/command-handlers/CreatePostCommandHandler");
const PostFactory = require("../../src/domain/factories/PostFactory");

class FakePostRepository {
  constructor() {
    this.posts = [];
  }

  async save(post) {
    this.posts.push(post);
    return post;
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
  constructor() {
    this.events = [];
  }

  async publish(event) {
    this.events.push(event);
  }
}

describe("CreatePostCommandHandler", () => {
  test("should create post and return only id", async () => {
    const repository = new FakePostRepository();
    const notificationService = new FakeNotificationService();
    const eventBus = new FakeEventBus();
    const factory = new PostFactory();

    const handler = new CreatePostCommandHandler(
      factory,
      repository,
      notificationService,
      eventBus
    );

    const command = new CreatePostCommand({
      authorId: "user-1",
      content: "Hello CQS",
    });

    const result = await handler.handle(command);

    expect(typeof result).toBe("string");
    expect(repository.posts.length).toBe(1);
    expect(notificationService.notifications.length).toBe(1);
    expect(eventBus.events.length).toBe(1);
  });

  test("should throw domain error for invalid content", async () => {
    const repository = new FakePostRepository();
    const notificationService = new FakeNotificationService();
    const eventBus = new FakeEventBus();
    const factory = new PostFactory();

    const handler = new CreatePostCommandHandler(
      factory,
      repository,
      notificationService,
      eventBus
    );

    const command = new CreatePostCommand({
      authorId: "user-1",
      content: "",
    });

    await expect(handler.handle(command)).rejects.toThrow();
  });
});