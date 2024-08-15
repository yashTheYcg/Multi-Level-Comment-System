const mongoose = require('mongoose');
const uuid4 = require('uuid4');

const postSchema = new mongoose.Schema({
    postId:{
        type:String,
        default:uuid4(),
    },
    userId:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        default:"No Content...",
    },
    comments:{
        type:Number,
        default:0,
    },
    likes:{
        type:Number,
        default:0,
    }, 
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})


module.exports = mongoose.model('post',postSchema);