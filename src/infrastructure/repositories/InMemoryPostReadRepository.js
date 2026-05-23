const PostReadRepository = require("../../application/repositories/PostReadRepository");
const PostReadModel = require("../../application/read-models/PostReadModel");
const CommentReadModel = require("../../application/read-models/CommentReadModel");

class InMemoryPostReadRepository extends PostReadRepository {
  constructor(store) {
    super();
    this.store = store;
  }

  findAll(query) {
    return this.store.posts
      .slice(query.offset, query.offset + query.limit)
      .map((post) => this.toReadModel(post));
  }

  findById(postId) {
    const post = this.store.posts.find((p) => p.id === postId);

    if (!post) {
      return null;
    }

    return this.toReadModel(post);
  }

  toReadModel(post) {
    return new PostReadModel({
      id: post.id,
      authorId: post.authorId,
      content: post.content,
      likesCount: post.likesCount,
      comments: post.comments.map(
        (comment) =>
          new CommentReadModel({
            id: comment.id,
            postId: comment.postId,
            authorId: comment.authorId,
            content: comment.content,
          })
      ),
    });
  }
}

module.exports = InMemoryPostReadRepository;