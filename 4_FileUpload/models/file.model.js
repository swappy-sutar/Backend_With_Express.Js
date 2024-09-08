import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    tags:{
        type:String
    },
    imageUrl:{
        type:String,
    },
    videoUrl:{
        type:String,
    }
},{timestamps:true})

export const File = mongoose.model("File",fileSchema); 