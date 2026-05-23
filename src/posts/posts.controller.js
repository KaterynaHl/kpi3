const { posts } = require("../repositories/db");

const createPost = (req, res) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title required",
    });
  }

  const post = {
    id: Date.now(),
    title,
    content,
    authorId: req.user.id,
  };

  posts.push(post);

  res.status(201).json(post);
};

const getPosts = (req, res) => {
  res.json(posts);
};

const getPostById = (req, res) => {
  const post = posts.find(
    (p) => p.id === Number(req.params.id)
  );

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json(post);
};

const deletePost = (req, res) => {
  const index = posts.findIndex(
    (p) => p.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  posts.splice(index, 1);

  res.status(204).send();
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
};