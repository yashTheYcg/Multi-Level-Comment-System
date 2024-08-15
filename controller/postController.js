const Comment = require('../models/Comment')
const Post = require('../models/Post');
const User = require('../models/User');

// creating post for the user
const createPost = async (req, res) => {
    try {
        // we get this with the jwt token after fetchUser
        const userId = req.user.id;
        const validUser = await User.findOne({ userId: userId });
        if (validUser) {
            const { content } = req.body;
            if (!content) return res.status(400).json({ message: "Please fill the required field", status: failure });
            // creating the post
            const post = new Post({ userId: userId, content: content });
            await post.save();
            res.status(200).json({ message: "Post created successfully" });
        } else {
            res.status(404).json({ message: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
    }
}

const creatingComment = async (req, res) => {

}

module.exports = { createPost, creatingComment }