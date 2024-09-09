// import { v2 as cloudinary } from "cloudinary";
// import path from "path";
// import fs from "fs";

// const uploadFileToCloudinary = async (file, folder, quality) => {
//   const options = { folder, resource_type: "auto" };

//   try {
//     if (!fs.existsSync(file.tempFilePath)) {
//       throw new Error("Temp file does not exist");
//     }

//     if (quality) {
//       options.quality = quality;
//     }

//     // console.log("Uploading file to Cloudinary:", file.tempFilePath);

//     const cloudinaryUpload = await cloudinary.uploader.upload(
//       file.tempFilePath,
//       options
//     );

//     // console.log("Cloudinary response:", cloudinaryUpload);
//     return cloudinaryUpload;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     throw new Error("Cloudinary upload failed");
//   }
// };

// export { uploadFileToCloudinary };