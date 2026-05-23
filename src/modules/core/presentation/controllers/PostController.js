const CreatePostCommand = require("../../application/commands/CreatePostCommand");
const AddCommentCommand = require("../../application/commands/AddCommentCommand");
const LikePostCommand = require("../../application/commands/LikePostCommand");

const GetPostsQuery = require("../../application/queries/GetPostsQuery");
const GetPostByIdQuery = require("../../application/queries/GetPostByIdQuery");

class PostController {
  constructor(coreModule) {
    this.coreModule = coreModule;
  }

  createPost = async (req, res, next) => {
    try {
      const command = new CreatePostCommand({
        authorId: req.user.id,
        content: req.body.content,
      });

      const postId = await this.coreModule.createPost(command);

      res.status(201).json({
        id: postId,
      });
    } catch (error) {
      next(error);
    }
  };

  getPosts = async (req, res, next) => {
    try {
      const query = new GetPostsQuery({
        limit: req.query.limit,
        offset: req.query.offset,
      });

      const posts = await this.coreModule.getPosts(query);

      res.json(posts);
    } catch (error) {
      next(error);
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const query = new GetPostByIdQuery({
        postId: req.params.id,
      });

      const post = await this.coreModule.getPostById(query);

      res.json(post);
    } catch (error) {
      next(error);
    }
  };

  addComment = async (req, res, next) => {
    try {
      const command = new AddCommentCommand({
        postId: req.params.id,
        authorId: req.user.id,
        content: req.body.content,
      });

      const commentId = await this.coreModule.addComment(command);

      res.status(201).json({
        id: commentId,
      });
    } catch (error) {
      next(error);
    }
  };

  likePost = async (req, res, next) => {
    try {
      const command = new LikePostCommand({
        postId: req.params.id,
        userId: req.user.id,
      });

      await this.coreModule.likePost(command);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = PostController;