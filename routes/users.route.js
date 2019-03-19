const express = require('express');
const router = express.Router();

const commentsService = require('../services/comments.service');
const postService = require('../services/posts.service');

router.get('/getcomments',commentsService.getComments);
router.get('/getposts',postService.getPosts);



module.exports = router;