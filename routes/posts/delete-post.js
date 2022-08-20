const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.delete('/:id', async (req, res) => {
    Post
        .deleteOne({_id: req.params.id})
        .then(() => res.status(200).send('deleted!'))
        .catch(error => console.log(error))
})

module.exports = router;