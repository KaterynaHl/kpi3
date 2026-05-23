const crypto = require("crypto");
const NotFoundError = require("../../domain/errors/NotFoundError");
const CommentContent = require("../../domain/value-objects/CommentContent");

class AddCommentCommandHandler {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async handle(command) {
    const post = await this.postRepository.findById(command.postId);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    const comment = post.addComment({
      id: crypto.randomUUID(),
      authorId: command.authorId,
      content: new CommentContent(command.content),
    });

    await this.postRepository.save(post);

    return comment.id;
  }
}

module.exports = AddCommentCommandHandler;