const { store } = require("./infrastructure/database/store");

const InMemoryUserRepository = require("./infrastructure/repositories/InMemoryUserRepository");
const InMemoryPostRepository = require("./infrastructure/repositories/InMemoryPostRepository");
const InMemoryPostReadRepository = require("./infrastructure/repositories/InMemoryPostReadRepository");

const PasswordHasher = require("./infrastructure/PasswordHasher");
const TokenService = require("./infrastructure/TokenService");

const UserFactory = require("./domain/factories/UserFactory");
const PostFactory = require("./domain/factories/PostFactory");

const RegisterUserCommandHandler = require("./application/command-handlers/RegisterUserCommandHandler");
const LoginUserCommandHandler = require("./application/command-handlers/LoginUserCommandHandler");
const CreatePostCommandHandler = require("./application/command-handlers/CreatePostCommandHandler");
const AddCommentCommandHandler = require("./application/command-handlers/AddCommentCommandHandler");
const LikePostCommandHandler = require("./application/command-handlers/LikePostCommandHandler");

const GetPostsQueryHandler = require("./application/query-handlers/GetPostsQueryHandler");
const GetPostByIdQueryHandler = require("./application/query-handlers/GetPostByIdQueryHandler");

const userRepository = new InMemoryUserRepository(store);
const postRepository = new InMemoryPostRepository(store);
const postReadRepository = new InMemoryPostReadRepository(store);

const passwordHasher = new PasswordHasher();
const tokenService = new TokenService();

const userFactory = new UserFactory(userRepository, passwordHasher);
const postFactory = new PostFactory();

module.exports = {
  tokenService,

  registerUserCommandHandler: new RegisterUserCommandHandler(
    userFactory,
    userRepository
  ),

  loginUserCommandHandler: new LoginUserCommandHandler(
    userRepository,
    passwordHasher,
    tokenService
  ),

  createPostCommandHandler: new CreatePostCommandHandler(
    postFactory,
    postRepository
  ),

  addCommentCommandHandler: new AddCommentCommandHandler(postRepository),

  likePostCommandHandler: new LikePostCommandHandler(postRepository),

  getPostsQueryHandler: new GetPostsQueryHandler(postReadRepository),

  getPostByIdQueryHandler: new GetPostByIdQueryHandler(postReadRepository),
};