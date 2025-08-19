const Post = require("../models/post");
const User = require("../models/user");

async function createPost(req, res) {
  try {
    const body = req.body;
    const post = { ...body, userId: req.user._id };
    const newPost = new Post(post);
    const result = await newPost.save();

    res.json({ result });
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function updatePost(req, res) {
  try {
    const body = req.body;
    const { _id } = req.user;
    const result = await Post.findOne({ _id: req.params.postId });
    if (!result) return res.json({ message: "cant post!!" });

    if (_id.toString() === result.userId.toString()) {
      const result = await Post.updateOne(
        { _id: req.params.postId },
        { $set: body }
      );
      res.json({ result, id: req.params.postId });
    } else {
      res.status(401).json({ message: "forbidden" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

async function deletePost(req, res) {
  try {
    const { _id } = req.user;
    const { userId } = await Post.findOne({ _id: req.params.postId });
    if (!userId) return res.json({ message: "cant delete!!" });

    if (_id.toString() === userId.toString()) {
      const result = await Post.deleteOne({ _id: req.params.postId });
      res.json({ result, id: req.params.postId });
    } else {
      res.status(401).json({ message: "forbidden" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = { createPost, updatePost, deletePost };
