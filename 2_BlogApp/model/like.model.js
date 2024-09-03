import mongoose, { Schema } from "mongoose";

const likeSchema= new Schema({
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user:{
        type:String,
        required:true
    },
})

export const Like = mongoose.model("Like",likeSchema);