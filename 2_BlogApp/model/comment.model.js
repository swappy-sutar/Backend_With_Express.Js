import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({

    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    user:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required: true
    }

})

export const Comment = mongoose.model("Comment",commentSchema);