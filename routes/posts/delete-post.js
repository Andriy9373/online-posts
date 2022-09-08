const fs = require('fs');
const Post = require('../../models/Post');

module.exports = async (req, res) => {
    Post
        .deleteOne({_id: req.params.id})
        .then(() => res.status(200).send('deleted!'))
        .catch(error => console.log(error))

    const posts_with_same_image = Post.find({image: req.body.imageName});
    posts_with_same_image.then(posts => {
        if (!posts.length) {
            if (req.body.imageName !== 'incognito.gif') {
                try {
                    fs.unlinkSync(`./files/${req.body.imageName}`);
                } catch(err) {
                    console.error(err);
                }
            }
        }
    })
}