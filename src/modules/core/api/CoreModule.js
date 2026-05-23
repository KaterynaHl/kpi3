class CoreModule {
    constructor({
      registerUserCommandHandler,
      loginUserCommandHandler,
      createPostCommandHandler,
      addCommentCommandHandler,
      likePostCommandHandler,
      getPostsQueryHandler,
      getPostByIdQueryHandler,
    }) {
      this.registerUserCommandHandler = registerUserCommandHandler;
      this.loginUserCommandHandler = loginUserCommandHandler;
      this.createPostCommandHandler = createPostCommandHandler;
      this.addCommentCommandHandler = addCommentCommandHandler;
      this.likePostCommandHandler = likePostCommandHandler;
      this.getPostsQueryHandler = getPostsQueryHandler;
      this.getPostByIdQueryHandler = getPostByIdQueryHandler;
    }
  
    async registerUser(command) {
      return this.registerUserCommandHandler.handle(command);
    }
  
    async loginUser(command) {
      return this.loginUserCommandHandler.handle(command);
    }
  
    async createPost(command) {
      return this.createPostCommandHandler.handle(command);
    }
  
    async addComment(command) {
      return this.addCommentCommandHandler.handle(command);
    }
  
    async likePost(command) {
      return this.likePostCommandHandler.handle(command);
    }
  
    async getPosts(query) {
      return this.getPostsQueryHandler.handle(query);
    }
  
    async getPostById(query) {
      return this.getPostByIdQueryHandler.handle(query);
    }
  }
  
  module.exports = CoreModule;