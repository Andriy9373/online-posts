const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.get('/:id', async (req, res) => {
    Post
        .find({_id: req.params.id})
        .then(post => res.status(200).send(post[0]))
        .catch(error => console.log(error))
})

module.exports = router;