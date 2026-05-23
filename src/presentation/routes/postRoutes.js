const express = require("express");

const PostController = require("../controllers/PostController");
const authMiddleware = require("../middleware/authMiddleware");

const createPostRoutes = (coreModule) => {
  const router = express.Router();

  const postController = new PostController(coreModule);

  router.get("/", postController.getPosts);
  router.get("/:id", postController.getPostById);
  router.post("/", authMiddleware, postController.createPost);
  router.post("/:id/comments", authMiddleware, postController.addComment);
  router.post("/:id/like", authMiddleware, postController.likePost);

  return router;
};

module.exports = createPostRoutes;