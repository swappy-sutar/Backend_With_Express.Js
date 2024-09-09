import { dirname } from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import { File } from "../models/file.model.js";
import path from "path";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    let filePath = path.resolve(
      __dirname,
      "files",
      `${Date.now()}.${file.name.split(".").pop()}`
    );
    file.mv(filePath, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          status: false,
          message: "File upload failed",
        });
      }

      res.json({
        status: true,
        data: filePath,
        message: "File locally uploaded successfully",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

function isFileSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

const uploadFileToCloudinary = async (file, folder,quality) => {
  const options = { folder,
    resource_type: "auto",
   };

  try {
    if (!fs.existsSync(file.tempFilePath)) {
      throw new Error("Temp file does not exist");
    }

    if(quality){
        options.quality = quality  
    }

    // console.log("Uploading file to Cloudinary:", file.tempFilePath); 

    const cloudinaryUpload = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );

    // console.log("Cloudinary response:", cloudinaryUpload);
    return cloudinaryUpload;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Cloudinary upload failed");
  }
}

const imageUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    const file = req.files.imageFile;

    if (!file) {
      return res
        .status(400)
        .json({ status: false, message: "No file provided" });
    }

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!isFileSupported(fileExtension, supportedTypes)) {
      return res.status(400).json({
        status: false,
        message: "File type not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "FileUpload");

    const fileData = await File.create({
      name: name,
      email: email,
      tags: tags,
      videoUrl: null,
      imageUrl: response.secure_url,
    });

    res.json({
      status: true,
      data: fileData,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error uploading file",
    });
  }
};

const videoUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    const file = req.files.videoFile;

    if (!file) {
      return res
        .status(400)
        .json({ status: false, message: "No file provided" });
    }

    const supportedTypes = ["mov", "mp4"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!isFileSupported(fileExtension, supportedTypes)) {
      return res.status(400).json({
        status: false,
        message: "File type not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "FileUpload");
    // console.log("response", response);
    

    const fileData = await File.create({
      name: name,
      email: email,
      tags: tags,
      videoUrl: response.secure_url,
    });

    res.json({
      status: true,
      data: fileData,
      message: "Video uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error uploading file",
    });
  }
};

const imageReducer = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    const file = req.files.imageFile;

    if (!file) {
      return res
        .status(400)
        .json({ status: false, message: "No file provided" });
    }

    // console.log("File received:", file); 

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!isFileSupported(fileExtension, supportedTypes)) {
      return res.status(400).json({
        status: false,
        message: "File type not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "FileUpload",90);

    const fileData = await File.create({
      name: name,
      email: email,
      tags: tags,
      imageUrl: response.secure_url,
    });

    res.json({
      status: true,
      data: fileData,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error uploading file",
    });
  }
};


export { localFileUpload, imageUpload, videoUpload,imageReducer };
