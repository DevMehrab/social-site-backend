const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  userId: {
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    immutable: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
