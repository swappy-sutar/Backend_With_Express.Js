import mongoose, { Schema } from "mongoose";
import { transporter } from "../utils/mailSend.js";

// Define the schema for the file
const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true, // Ensure email is always provided
    },
    tags: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);


fileSchema.post("save", async function (doc) {
  try {
    let info = await transporter.sendMail({
      from: "Er.Swappy.com",
      to: doc.email,
      subject: "file uploaded successfully",
      html: `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 20px;">
          <h1 style="color: #333;">Hello, ${doc.name}</h1>
          <h3 style="color: #333;">Wel-come to Swappy.com</h3>
          
          <p style="color: #555;">Your file has been uploaded successfully.</p>
          ${
            doc.imageUrl
              ? `<p><a href="${doc.imageUrl}" style="display: inline-block; color: #1a73e8; text-decoration: none; border: 1px solid #1a73e8; border-radius: 4px; padding: 10px 20px; background-color: #eaf0ff;">View Image</a></p>`
              : ""
          }
          ${
            doc.videoUrl
              ? `<p><a href="${doc.videoUrl}" style="display: inline-block; color: #1a73e8; text-decoration: none; border: 1px solid #1a73e8; border-radius: 4px; padding: 10px 20px; background-color: #eaf0ff;">View Video</a></p>`
              : ""
          }
          <p style="color: #777; font-size: 12px;">If you have any questions, feel free to contact us.</p>
        </div>
      </body>
    </html>
  `,
    });


    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
 
    console.error("Error sending email:", error);
  }
});

export const File = mongoose.model("File", fileSchema);
