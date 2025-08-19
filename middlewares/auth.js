const User = require("../models/user");
const { verifyAccess } = require("../utils/auth");

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "token required" });
    }
    const decoded = verifyAccess(token);
    if (!decoded) {
      return res.status(401).json({ message: "token invalid" });
    }

    const user = await User.findById(decoded.userId).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "access denied" });
  }
}

module.exports = authenticate;
