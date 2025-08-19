const { Router } = require("express");

const { createPost, updatePost, deletePost } = require("../controllers/post");
const { createComment, deleteComment } = require("../controllers/comment");
const authenticate = require("../middlewares/auth");

const postRouter = Router();
postRouter.post("/:postId/comment", authenticate, createComment);
postRouter.delete("/:postId/comment/:commentId", authenticate, deleteComment);
postRouter.post("/", authenticate, createPost);
postRouter.put("/:postId", authenticate, updatePost);
postRouter.delete("/:postId", authenticate, deletePost);

module.exports = postRouter;
