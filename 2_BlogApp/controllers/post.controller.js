import { Post } from "../model/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createPost = asyncHandler(async (req, res) => {
    const { title, body } = req.body;

    const post = new Post({title,body});
    const savePost = await post.save();

    res.status(201).json({
        success: true,
        data: savePost,
        message: "Post created successfully",
    });
});

const getPostByID = asyncHandler(async (req, res) => {
    const { postId } = req.body; 

    const post = await Post.findById(postId);

    if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  res.status(200).json({
    success: true,
    data: post,
    message: "Post found successfully",
  });
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("likes").populate("comments").exex();

  res.status(200).json({
    success: true,
    data: posts,
    message: "Posts found successfully",
  });
});

export { createPost, getPostByID, getAllPosts };
