const Post = require('../../models/Post');

module.exports = async (req, res) => {
    Post
        .find({_id: req.params.id})
        .then(post => res.status(200).send(post[0]))
        .catch(() => res.status(200).send(null))
}