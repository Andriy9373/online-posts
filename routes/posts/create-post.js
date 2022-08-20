const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

//get-list
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.content,
        createdAt: new Date().toLocaleDateString()
      });
  
      const savePost = await post.save();
      res.status(201).json(savePost);
})

module.exports = router;