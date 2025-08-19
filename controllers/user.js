const User = require("../models/user");
const config = require("../config");

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
  getUsers,
  getUser,
  profile,
};
