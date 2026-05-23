const crypto = require("crypto");

const NotFoundError = require("../../domain/errors/NotFoundError");
const CommentContent = require("../../domain/value-objects/CommentContent");
const CommentAddedEvent = require("../../domain/events/CommentAddedEvent");

class AddCommentCommandHandler {
  constructor(postRepository, eventBus) {
    this.postRepository = postRepository;
    this.eventBus = eventBus;
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

    await this.eventBus.publish(
      new CommentAddedEvent({
        postId: post.id,
        commentId: comment.id,
        authorId: comment.authorId,
        content: comment.content,
      })
    );

    return comment.id;
  }
}

module.exports = AddCommentCommandHandler;