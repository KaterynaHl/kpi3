const Post = require("../../src/modules/core/domain/entities/Post");
const PostContent = require("../../src/modules/core/domain/value-objects/PostContent");
const CommentContent = require("../../src/modules/core/domain/value-objects/CommentContent");

describe("Post domain entity", () => {
  test("author can update post", () => {
    const post = new Post({
      id: "1",
      authorId: "user-1",
      content: new PostContent("Old content"),
    });

    post.update("user-1", new PostContent("New content"));

    expect(post.content).toBe("New content");
  });

  test("not author cannot update post", () => {
    const post = new Post({
      id: "1",
      authorId: "user-1",
      content: new PostContent("Content"),
    });

    expect(() => {
      post.update("user-2", new PostContent("New content"));
    }).toThrow();
  });

  test("user can add comment", () => {
    const post = new Post({
      id: "1",
      authorId: "user-1",
      content: new PostContent("Content"),
    });

    const comment = post.addComment({
      id: "comment-1",
      authorId: "user-2",
      content: new CommentContent("Nice post"),
    });

    expect(comment.content).toBe("Nice post");
    expect(post.comments.length).toBe(1);
  });
});