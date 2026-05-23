const CreatePostCommand = require("../../application/commands/CreatePostCommand");
const AddCommentCommand = require("../../application/commands/AddCommentCommand");
const LikePostCommand = require("../../application/commands/LikePostCommand");

const GetPostsQuery = require("../../application/queries/GetPostsQuery");
const GetPostByIdQuery = require("../../application/queries/GetPostByIdQuery");

const {
  createPostCommandHandler,
  addCommentCommandHandler,
  likePostCommandHandler,
  getPostsQueryHandler,
  getPostByIdQueryHandler,
} = require("../../container");

const createPost = async (req, res, next) => {
  try {
    const command = new CreatePostCommand({
      authorId: req.user.id,
      content: req.body.content,
    });

    const postId = await createPostCommandHandler.handle(command);

    res.status(201).json({
      id: postId,
    });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const query = new GetPostsQuery({
      limit: req.query.limit,
      offset: req.query.offset,
    });

    const posts = await getPostsQueryHandler.handle(query);

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const query = new GetPostByIdQuery({
      postId: req.params.id,
    });

    const post = await getPostByIdQueryHandler.handle(query);

    res.json(post);
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const command = new AddCommentCommand({
      postId: req.params.id,
      authorId: req.user.id,
      content: req.body.content,
    });

    const commentId = await addCommentCommandHandler.handle(command);

    res.status(201).json({
      id: commentId,
    });
  } catch (error) {
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const command = new LikePostCommand({
      postId: req.params.id,
      userId: req.user.id,
    });

    await likePostCommandHandler.handle(command);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  addComment,
  likePost,
};