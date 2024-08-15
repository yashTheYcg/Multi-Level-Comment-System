const mongoose = require('mongoose');
const uuid4 = require('uuid4');

const commentSchema = new mongoose.Schema({
    commentId:{
        type:String,
        required:uuid4(),
    },
    postId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    parentCommentId:{
        type:String,
    },
    text:{
        type:String,
        default:"",
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
    totalReplies:{
        type:Number,
        default:0,
    }
})


module.exports = mongoose.model('comment',commentSchema);