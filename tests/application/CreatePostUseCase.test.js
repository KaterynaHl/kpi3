const CreatePostUseCase = require("../../src/application/use-cases/CreatePostUseCase");
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

describe("CreatePostUseCase", () => {
  test("should create post through use case", async () => {
    const repository = new FakePostRepository();
    const factory = new PostFactory();
    const useCase = new CreatePostUseCase(factory, repository);

    const post = await useCase.execute({
      authorId: "user-1",
      content: "Hello world",
    });

    expect(post.content).toBe("Hello world");
    expect(repository.posts.length).toBe(1);
  });
});