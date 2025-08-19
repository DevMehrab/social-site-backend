const { Router } = require("express");
const {
  registerUser,
  login,
  logout,
  refreshToken,
} = require("../controllers/auth");

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.post("/refresh", refreshToken);
authRouter.post("/logout", logout);

module.exports = authRouter;
