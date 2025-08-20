const { Router } = require("express");
const {
  getUsers,
  getUser,
  profile,
  getPost,
  follow,
  unfollow,
} = require("../controllers/user");

const authenticate = require("../middlewares/auth");

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId/post", getPost);
userRouter.get("/:id", getUser);

userRouter.post("/:userId/follow", authenticate, follow);
userRouter.delete("/:userId/follow", authenticate, unfollow);
userRouter.post("/profile", authenticate, profile);

module.exports = userRouter;
