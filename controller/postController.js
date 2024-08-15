const Comment = require('../models/Comment')
const Post = require('../models/Post');
const User = require('../models/User');
const uuid4 = require('uuid4');

// creating post for the user
const createPost = async (req, res) => {
    try {
        // we get this with the jwt token after fetchUser
        const userId = req.user.id;
        // checking the validity of the user
        const validUser = await User.findOne({ userId: userId });
        if (validUser) {
            const { content } = req.body;
            if (!content) return res.status(400).json({ message: "Please fill the required field", status: failure });
            // creating the post
            const post = new Post({ userId: userId, content: content,postId:uuid4() });
            await post.save();
            res.status(200).json({ message: "Post created successfully" });
        } else {
            res.status(404).json({ message: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

// creating the comment
const creatingComment = async (req, res) => {
    try {
        const userId = req.user.id;
        // checking the validity of the user
        const validUser = await User.findOne({ userId: userId });
        if (validUser) {
            // checking the post is valid or not
            const postId = req.params.postId;
            const validPost = await Post.findOne({userId:userId,postId:postId});

            if(validPost){
                // creating the comment
                const text = req.body.text;
                const comment = new Comment({
                    commentId:uuid4(),
                    userId:userId,
                    postId:postId,
                    text:text,
                })
                await comment.save();

                 // increase the comment number in the above post
                validPost.comments++;
                await validPost.save();
                res.status(200).json({ message: "Comment added successfully" });
            }else{
                res.status(404).json({ message: "Post does not exist" });
            }
        } else {
            res.status(404).json({ message: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

// replying the comment
const replyingComment = async (req,res)=> {
    try {
        const userId = req.user.id;
        // checking the validity of the user
        const validUser = await User.findOne({ userId: userId });
        if (validUser) {
            // checking the post is valid or not
            const postId = req.params.postId;
            const validPost = await Post.findOne({userId:userId,postId:postId});

            if(validPost){
                // creating the reply comment
                const text = req.body.text;
                const parentCommentId = req.params.commentId;

                const validParentComment = await Comment.findOne({commentId:parentCommentId});

                // checking the validity of Parent comment
                if(!validParentComment) return res.statu(404).json({message:"Parent comment not Found"});

                const comment = new Comment({
                    commentId:uuid4(),
                    userId:userId,
                    postId:postId,
                    text:text,
                    parentCommentId:parentCommentId,
                })
                await comment.save();

                // increase the comment number in the above post
                validPost.comments++;
                await validPost.save();
                
                // increase the replied number in the above parent comment
                validParentComment.totalReplies++;
                await validParentComment.save();
                res.status(200).json({ message: "Comment replied" });
            }else{
                res.status(404).json({ message: "Post does not exist" });
            }
        } else {
            res.status(404).json({ message: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

const gettingComments = async (req,res)=> {
    try {
        const userId = req.user.id;
        // checking the validity of the user

        const {sortBy, sortOrder} = req.query;

        if(sortBy!= "createdAt" && sortBy!="totalReplies"){
            return res.status(400).json({message:"Please select valid sortBy option 'createdAt' or 'totalReplies'"});
        }
        
        if(sortOrder!= "asc" && sortOrder!="desc"){
            return res.status(400).json({message:"Please select valid sortorder option 'asc' or 'desc"});
        }

        const validUser = await User.findOne({ userId: userId });
        if (validUser) {
            // checking the post is valid or not
            const postId = req.params.postId;
            const validPost = await Post.findOne({userId:userId,postId:postId});

            if(validPost){
                // getting the comments
                let comments = await Comment.find({
                    postId:postId,
                    parentCommentId:null
                })
                .sort({[sortBy]:sortOrder === "asc" ? 1 : -1})
                .select('-_id -__v') 
                .lean(); //for only getting javascript object

                // for recent 2 replies of the comments
                for(let comment of comments){
                    const replies = await Comment.find({parentCommentId:comment.commentId})
                    .sort({createdAt: -1})
                    .limit(2) //according to task
                    .select('-_id commentId text createdAt')
                    .lean();

                    comment.replies = replies;
                }
                res.status(200).json({ comments:comments});
            }else{
                res.status(404).json({ message: "Post does not exist" });
            }
        } else {
            res.status(404).json({ message: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

const expandComments = async (req, res)=> {
    try {
        const userId = req.user.id;
        // checking the validity of the user

        const { page, pageSize } = req.query;

        // checking for only numbers
        if(isNaN(page) && isNaN(pageSize)) return res.status(400).json({message:"Only Numbers are allowed"});

        const validUser = await User.findOne({ userId: userId });
        if (validUser) {
            // checking the post is valid or not
            const {postId,commentId} = req.params;
            const validPost = await Post.findOne({userId:userId,postId:postId});

            if(validPost){
                // getting the comments
                const skip = 2 + (page - 1) * pageSize;
                let replies = await Comment.find({
                    parentCommentId:commentId
                })
                .sort({createdAt: -1})
                .skip(skip)
                .limit(parseInt(pageSize))
                .select('-_id -__v') 
                .lean(); //for only getting javascript object

                // for recent 2 replies of the comments
                for(let reply of replies){
                    const nestedReplies = await Comment.find({parentCommentId:reply.commentId})
                    .sort({createdAt: -1})
                    .limit(2) //according to task
                    .select('-_id commentId text createdAt')
                    .lean();

                    reply.replies = nestedReplies;
                }
                res.status(200).json({ replies: replies});
            }else{
                res.status(404).json({ message: "Post does not exist" });
            }
        } else {
            res.status(404).json({ message: "User does not exist" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

module.exports = { createPost, creatingComment,replyingComment,gettingComments,expandComments }