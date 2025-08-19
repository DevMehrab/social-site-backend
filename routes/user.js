const { Router } = require("express");
const { getUsers, getUser, profile } = require("../controllers/user");

const authenticate = require("../middlewares/auth");

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);

userRouter.post("/profile", authenticate, profile);

module.exports = userRouter;
