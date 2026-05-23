const PostRepository = require(
    "../../domain/repositories/PostRepository"
  );
  
  class InMemoryPostRepository extends PostRepository {
    constructor(store) {
      super();
  
      this.store = store;
    }
  
    async save(post) {
      const existingIndex =
        this.store.posts.findIndex(
          (p) => p.id === post.id
        );
  
      if (existingIndex === -1) {
        this.store.posts.push(post);
      } else {
        this.store.posts[existingIndex] =
          post;
      }
  
      return post;
    }
  
    async findById(id) {
      return (
        this.store.posts.find(
          (post) => post.id === id
        ) || null
      );
    }
  
    async findAll() {
      return this.store.posts;
    }
  
    async delete(id) {
      this.store.posts =
        this.store.posts.filter(
          (post) => post.id !== id
        );
    }
  }
  
  module.exports =
    InMemoryPostRepository;