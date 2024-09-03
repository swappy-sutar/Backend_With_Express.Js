import { Router } from "express"
import {createComment} from "../controllers/comment.controller.js"
import {createPost,getPostByID,getAllPosts} from "../controllers/post.controller.js"
import {likeAndUnlike} from "../controllers/like.controller.js"
const router = Router();

router.post("/create-comment",createComment)
router.post("/create-post", createPost);
router.get("/get-single-post", getPostByID);
router.get("/get-post", getAllPosts);
router.post("/like-and-unlike", likeAndUnlike);





export default router;