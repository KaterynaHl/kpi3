const NotFoundError = require("../../domain/errors/NotFoundError");
const CommentContent = require("../../domain/value-objects/CommentContent");
const crypto = require("crypto");

class AddCommentUseCase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute(dto) {
    const post = await this.postRepository.findById(dto.postId);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    const comment = post.addComment({
      id: crypto.randomUUID(),
      authorId: dto.authorId,
      content: new CommentContent(dto.content),
    });

    await this.postRepository.save(post);

    return comment;
  }
}

module.exports = AddCommentUseCase;