const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.get('/', async (req, res) => {
    Post
        .find()
        .then(posts => res.status(200).send(posts))
        .catch(error => console.log(error))
})

module.exports = router;