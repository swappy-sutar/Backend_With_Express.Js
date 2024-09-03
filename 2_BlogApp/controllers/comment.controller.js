import { Post } from "../model/post.model.js";
import { Comment } from "../model/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createComment = asyncHandler(async (req, res) => {
  const { post, user, body } = req.body;

  const comment = new Comment({ post, user, body });
  const saveComment = await comment.save();

  const updatePost = await Post.findByIdAndUpdate(
    post,
    {
      $push: { comments: saveComment._id },
    },
    {
      new: true,
    }
  )
    .populate("comments")
    .exec();

  res.status(201).json({
    status: true,
    data: updatePost,
    message: "Comment created successfully",
  });
});

export { createComment };
