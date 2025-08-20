const User = require("../models/user");
const config = require("../config");
const Post = require("../models/post");

async function getUsers(req, res) {
  const users = await User.find();
  res.json(users);
}
async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "user doesnt exist" });
    }
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "user not found" });
  }
}
async function getPost(req, res) {
  try {
    const post = await Post.find({ userId: req.params.userId });
    if (!post) {
      return res.status(404).json({ message: "user doesnt exist" });
    }
    res.json({ post });
  } catch (error) {
    res.status(404).json({ message: "user not found" });
  }
}
async function follow(req, res) {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(404).json({ message: "Please login first" });
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "user doesnt exist" });
    }
    const candidate = await User.updateOne(
      { _id: userId },
      { $addToSet: { following: user._id } }
    );
    const target = await User.updateOne(
      { _id: req.params.userId },
      { $addToSet: { followers: userId } }
    );
    res.json({ user: req.params.userId, candidate, target });
  } catch (error) {
    res.status(404).json({ message: "user not found" });
  }
}
async function unfollow(req, res) {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(404).json({ message: "Please login first" });
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "user doesnt exist" });
    }
    const candidate = await User.updateOne(
      { _id: userId },
      { $pull: { following: user._id } }
    );
    const target = await User.updateOne(
      { _id: req.params.userId },
      { $pull: { followers: userId } }
    );
    res.json({ user: req.params.userId, candidate, target });
  } catch (error) {
    res.status(404).json({ message: "user not found" });
  }
}

async function profile(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "user not found from profile" });
    }
    res.json({ message: "profile visit", user: user });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "user not found catched", error: error.message });
  }
}
module.exports = {
  getPost,
  getUsers,
  getUser,
  profile,
  follow,
  unfollow,
};
