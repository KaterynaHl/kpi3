const { comments } = require("../repositories/db");

const createComment = (req, res) => {
  const comment = {
    id: Date.now(),
    text: req.body.text,
    postId: Number(req.params.id),
    authorId: req.user.id,
  };

  comments.push(comment);

  res.status(201).json(comment);
};

module.exports = {
  createComment,
};