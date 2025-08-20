const User = require("../models/user");
const { hash } = require("bcrypt");
const { generateTokens, verifyRefresh } = require("../utils/auth");
const config = require("../config");

async function registerUser(req, res) {
  try {
    const body = req.body;
    if (!body) {
      return res
        .status(400)
        .json({ message: "please give all the required info", body });
    }
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(409).json({ message: "user already exist", user });
    }

    const hashedPassword = await hash(body.password, 10);
    const newUser = new User({ ...body, password: hashedPassword });
    await newUser.save();

    const { accessToken, refreshToken } = generateTokens({
      userId: newUser._id.toString(),
    });
    res.cookie("refreshToken", refreshToken, config.cookieOptions);
    res.status(201).json({ message: "user created", token: accessToken });
  } catch (error) {
    console.log(`${error} `.bgYellow, error);
    res.status(401).json({ message: "user registration failed", error });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "invalid credential" });
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(401).json({ message: "invalid credential" });
    }
    const { accessToken, refreshToken } = generateTokens({ userId: user._id });
    res.cookie("refreshToken", refreshToken, config.cookieOptions);
    res
      .status(200)
      .json({ message: "login successful", token: accessToken, refreshToken });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "login failed", error: error.message });
  }
}

async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    console.log(req);
    if (!refreshToken) {
      return res.status(401).json({ message: "refresh token required" });
    }

    const decoded = verifyRefresh(refreshToken);
    if (!decoded) {
      return res.status(401).json({ message: "refresh token invalid" });
    }
    const user = await User.findById(decoded.userId).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }
    const { accessToken } = generateTokens({ userId: user._id });
    res
      .status(200)
      .json({ message: "new acces token created", token: accessToken });
  } catch (error) {
    return res.status(401).json({ message: "access denied" });
  }
}

async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "refresh token required" });
    }
    const decoded = verifyRefresh(refreshToken);
    if (!decoded) {
      return res.status(401).json({ message: "refresh token invalid" });
    }
    const user = User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    res.clearCookie("refreshToken");
    res.json({ message: "logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
}

module.exports = { registerUser, login, logout, refreshToken };
