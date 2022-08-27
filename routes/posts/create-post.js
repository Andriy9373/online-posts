const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

const calculateDate = () => {
  const date = new Date();
  let month = date.getMonth();
  let day = date.getDate();
  (month < 10 ? month = `0${month}` : null);
  (day < 10 ? day = `0${day}` : null);
  return `${day}/${month}/${date.getFullYear()}`;
}

//get-list
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        createdAt: calculateDate()
      });
  
      const savePost = await post.save();
      res.status(201).json(savePost);
})

module.exports = router;