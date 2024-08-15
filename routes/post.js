const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');

// controller functions
const {createPost,creatingComment,replyingComment,gettingComments,expandComments} = require('../controller/postController')
const {signupUser,loginUser} = require('../controller/userController');


// Route-1 for creating  the user
router.post('/signup',signupUser);

// Route-2 for logging  the user
router.post('/login',loginUser);

// Route-3 for creating  the post
router.post('/posts',fetchUser,createPost);

// Route-4 for creating  the comment
router.post('/posts/:postId/comments',fetchUser,creatingComment);

// Route-5 for replying the existing comment
router.post('/posts/:postId/comments/:commentId/reply',fetchUser,replyingComment);

// Route-6 for getting all comments of the post
router.get('/posts/:postId/comments',fetchUser,gettingComments);

// Route-7 for expanding the comments further for the replies
router.get('/posts/:postId/comments/:commentId/expand',fetchUser,expandComments);



module.exports = router;