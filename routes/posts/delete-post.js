const Post = require('../../models/Post');

module.exports = async (req, res) => {
    Post
        .deleteOne({_id: req.params.id})
        .then(() => res.status(200).send('deleted!'))
        .catch(error => console.log(error))
}