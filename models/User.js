const mongoose = require('mongoose');
const uuid4 = require('uuid4');

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        default:uuid4(),
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
})

module.exports = mongoose.model('user',userSchema);