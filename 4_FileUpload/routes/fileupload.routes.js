import express from "express"
import {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageReducer,
} from "../controllers/fileUpload.controller.js";
// import {uploadFileToCloudinary} from "../middlewares/fileUpload.middleware.js"

const router = express.Router()

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducer", imageReducer);


export default router;