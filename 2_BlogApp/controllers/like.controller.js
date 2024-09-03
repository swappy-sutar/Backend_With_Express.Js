import { Like } from "../model/like.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../model/post.model.js";

const likeAndUnlike = asyncHandler(async (req, res) => {
  const { postId, userId } = req.body;

  const existingLike = await Like.findOne({ post: postId, user: userId });

  if (existingLike) {
    
    await Like.deleteOne({ _id: existingLike._id }); 

    await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: existingLike._id }, 
      },
      { new: true }
    );

    res.json({
      status: true,
      message: "Post Unlike Successfully",
    });
  } else {
    const newLike = new Like({
      post: postId,
      user: userId,
    });
    const savedLike = await newLike.save();

    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: savedLike._id },
      },
      { new: true }
    )
      .populate("likes")
      .exec();

    res.json({
      status: true,
      likes: savedLike,
      message: "Post liked successfully",
    });
  }
});

export { likeAndUnlike };
