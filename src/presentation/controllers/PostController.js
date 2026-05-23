const CreatePostDTO = require("../../application/dto/CreatePostDTO");
const AddCommentDTO = require("../../application/dto/AddCommentDTO");

const {
  createPostUseCase,
  getPostsUseCase,
  addCommentUseCase,
  likePostUseCase,
} = require("../../container");

const mapPostResponse = (post) => ({
  id: post.id,
  authorId: post.authorId,
  content: post.content,
  likesCount: post.likesCount,
  comments: post.comments.map((comment) => ({
    id: comment.id,
    postId: comment.postId,
    authorId: comment.authorId,
    content: comment.content,
  })),
});

const createPost = async (req, res, next) => {
  try {
    const dto = new CreatePostDTO({
      authorId: req.user.id,
      content: req.body.content,
    });

    const post = await createPostUseCase.execute(dto);

    res.status(201).json(mapPostResponse(post));
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await getPostsUseCase.execute();

    res.json(posts.map(mapPostResponse));
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const dto = new AddCommentDTO({
      postId: req.params.id,
      authorId: req.user.id,
      content: req.body.content,
    });

    const comment = await addCommentUseCase.execute(dto);

    res.status(201).json({
      id: comment.id,
      postId: comment.postId,
      authorId: comment.authorId,
      content: comment.content,
    });
  } catch (error) {
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const post = await likePostUseCase.execute({
      postId: req.params.id,
      userId: req.user.id,
    });

    res.json(mapPostResponse(post));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getPosts,
  addComment,
  likePost,
};