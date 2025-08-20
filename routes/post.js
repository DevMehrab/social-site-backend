const { Router } = require("express");

const {
  getPost,
  createPost,
  updatePost,
  deletePost,
  like,
  unlike,
} = require("../controllers/post");
const { createComment, deleteComment } = require("../controllers/comment");
const authenticate = require("../middlewares/auth");

const postRouter = Router();
postRouter.get("/", getPost);
postRouter.post("/:postId/comment", authenticate, createComment);
postRouter.delete("/:postId/comment/:commentId", authenticate, deleteComment);
postRouter.post("/", authenticate, createPost);
postRouter.post("/:postId/like", authenticate, like);
postRouter.delete("/:postId/like", authenticate, unlike);
postRouter.put("/:postId", authenticate, updatePost);
postRouter.delete("/:postId", authenticate, deletePost);

module.exports = postRouter;
