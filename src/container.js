const { store } = require("./infrastructure/database/store");

const InMemoryUserRepository = require("./infrastructure/repositories/InMemoryUserRepository");
const InMemoryPostRepository = require("./infrastructure/repositories/InMemoryPostRepository");

const PasswordHasher = require("./infrastructure/PasswordHasher");
const TokenService = require("./infrastructure/TokenService");

const UserFactory = require("./domain/factories/UserFactory");
const PostFactory = require("./domain/factories/PostFactory");

const RegisterUserUseCase = require("./application/use-cases/RegisterUserUseCase");
const LoginUserUseCase = require("./application/use-cases/LoginUserUseCase");
const CreatePostUseCase = require("./application/use-cases/CreatePostUseCase");
const GetPostsUseCase = require("./application/use-cases/GetPostsUseCase");
const AddCommentUseCase = require("./application/use-cases/AddCommentUseCase");
const LikePostUseCase = require("./application/use-cases/LikePostUseCase");

const userRepository = new InMemoryUserRepository(store);
const postRepository = new InMemoryPostRepository(store);

const passwordHasher = new PasswordHasher();
const tokenService = new TokenService();

const userFactory = new UserFactory(userRepository, passwordHasher);
const postFactory = new PostFactory();

module.exports = {
  tokenService,

  registerUserUseCase: new RegisterUserUseCase(userFactory, userRepository),
  loginUserUseCase: new LoginUserUseCase(
    userRepository,
    passwordHasher,
    tokenService
  ),

  createPostUseCase: new CreatePostUseCase(postFactory, postRepository),
  getPostsUseCase: new GetPostsUseCase(postRepository),
  addCommentUseCase: new AddCommentUseCase(postRepository),
  likePostUseCase: new LikePostUseCase(postRepository),
};