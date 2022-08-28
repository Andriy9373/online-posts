const Post = require('../../models/Post');

module.exports = async (req, res) => {
    Post
        .find()
        .then(posts => res.status(200).send(posts.reverse()))
        .catch(error => console.log(error))
}