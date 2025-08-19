const Comment = require("../models/comment");

async function createComment(req, res) {
  try {
    const body = req.body;
    const comment = {
      ...body,
      postId: req.params.postId,
      userId: req.user._id,
    };
    const newComment = new Comment(comment);
    const result = await newComment.save();
    res.json({ result, comment: req.query });
  } catch (error) {
    console.log(error);

    res.json({ message: "comment error" });
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await Comment.findOne({ _id: req.params.commentId });
    if (!comment) return res.status(404).json({ message: "comment not found" });

    if (comment.userId.toString() === req.user._id.toString()) {
      const result = await Comment.deleteOne({ _id: req.params.commentId });
      res.status(200).json({ message: "comment deleted", result });
    } else {
      res.status(401).json({ message: "comment cant delete, forbidden" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "comment delete error" });
  }
}

module.exports = { createComment, deleteComment };
