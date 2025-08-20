const mongoose = require("mongoose");
const { compare } = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  refreshToken: {
    type: String,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  try {
    return await compare(canditatePassword, this.password);
  } catch (error) {
    return null;
  }
};
userSchema.methods.addRefreshToken = async function (token) {
  this.refreshToken = token;
  return this.save();
};
userSchema.methods.removeRefreshToken = async function () {
  this.refreshToken = null;
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
