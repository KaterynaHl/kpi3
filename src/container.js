const { store } = require("./modules/core/infrastructure/database/store");

const CoreModule = require("./modules/core/api/CoreModule");
const AnalyticsModule = require("./modules/analytics/api/AnalyticsModule");

const InMemoryUserRepository = require("./modules/core/infrastructure/repositories/InMemoryUserRepository");
const InMemoryPostRepository = require("./modules/core/infrastructure/repositories/InMemoryPostRepository");
const InMemoryPostReadRepository = require("./modules/core/infrastructure/repositories/InMemoryPostReadRepository");

const InMemoryAnalyticsRepository = require("./modules/analytics/infrastructure/repositories/InMemoryAnalyticsRepository");

const PasswordHasher = require("./modules/core/infrastructure/PasswordHasher");
const TokenService = require("./modules/core/infrastructure/TokenService");

const ConsoleNotificationService = require("./modules/core/infrastructure/notifications/ConsoleNotificationService");

const InProcessEventBus = require("./modules/core/infrastructure/events/InProcessEventBus");
const PostCreatedNotificationHandler = require("./modules/core/infrastructure/events/PostCreatedNotificationHandler");

const UserFactory = require("./modules/core/domain/factories/UserFactory");
const PostFactory = require("./modules/core/domain/factories/PostFactory");

const RegisterUserCommandHandler = require("./modules/core/application/command-handlers/RegisterUserCommandHandler");
const LoginUserCommandHandler = require("./modules/core/application/command-handlers/LoginUserCommandHandler");
const CreatePostCommandHandler = require("./modules/core/application/command-handlers/CreatePostCommandHandler");
const AddCommentCommandHandler = require("./modules/core/application/command-handlers/AddCommentCommandHandler");
const LikePostCommandHandler = require("./modules/core/application/command-handlers/LikePostCommandHandler");

const GetPostsQueryHandler = require("./modules/core/application/query-handlers/GetPostsQueryHandler");
const GetPostByIdQueryHandler = require("./modules/core/application/query-handlers/GetPostByIdQueryHandler");

const CoreEventTranslator = require("./modules/analytics/acl/CoreEventTranslator");
const PostCreatedAnalyticsHandler = require("./modules/analytics/application/event-handlers/PostCreatedAnalyticsHandler");
const PostLikedAnalyticsHandler = require("./modules/analytics/application/event-handlers/PostLikedAnalyticsHandler");
const CommentAddedAnalyticsHandler = require("./modules/analytics/application/event-handlers/CommentAddedAnalyticsHandler");
const GetAnalyticsSummaryQueryHandler = require("./modules/analytics/application/query-handlers/GetAnalyticsSummaryQueryHandler");

const userRepository = new InMemoryUserRepository(store);
const postRepository = new InMemoryPostRepository(store);
const postReadRepository = new InMemoryPostReadRepository(store);

const analyticsRepository = new InMemoryAnalyticsRepository();

const passwordHasher = new PasswordHasher();
const tokenService = new TokenService();

const notificationService = new ConsoleNotificationService();
const eventBus = new InProcessEventBus();

const userFactory = new UserFactory(userRepository, passwordHasher);
const postFactory = new PostFactory();

eventBus.subscribe(
  "PostCreated",
  new PostCreatedNotificationHandler(notificationService)
);

eventBus.subscribe(
  "PostCreated",
  new PostCreatedAnalyticsHandler(
    analyticsRepository,
    new CoreEventTranslator()
  )
);

eventBus.subscribe(
  "PostLiked",
  new PostLikedAnalyticsHandler(analyticsRepository)
);

eventBus.subscribe(
  "CommentAdded",
  new CommentAddedAnalyticsHandler(analyticsRepository)
);

const coreModule = new CoreModule({
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
    postRepository,
    notificationService,
    eventBus
  ),

  addCommentCommandHandler: new AddCommentCommandHandler(
    postRepository,
    eventBus
  ),

  likePostCommandHandler: new LikePostCommandHandler(
    postRepository,
    eventBus
  ),

  getPostsQueryHandler: new GetPostsQueryHandler(postReadRepository),

  getPostByIdQueryHandler: new GetPostByIdQueryHandler(postReadRepository),
});

const analyticsModule = new AnalyticsModule({
  getAnalyticsSummaryQueryHandler: new GetAnalyticsSummaryQueryHandler(
    analyticsRepository
  ),
});

module.exports = {
  tokenService,
  coreModule,
  analyticsModule,
};