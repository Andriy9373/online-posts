const Post = require('../../models/Post');
const sharp = require('sharp');

const calculateDate = () => {
    const date = new Date();
    let month = date.getMonth();
    let day = date.getDate();
    (month < 10 ? month = `0${month}` : null);
    (day < 10 ? day = `0${day}` : null);
    return `${day}/${month}/${date.getFullYear()}`;
}

module.exports = async (req, res) => {
    let errors = [];

    // check body values
    if (!req.body.title) errors.push('title');
    if (!req.body.content) errors.push('content');
    if (!req.body.author) errors.push('author');

    // file handler
    let fileName;
    if (errors.length === 0) {
        if (req.files) {
            const extensions = ['png', 'jpg', 'jpeg', 'svg', 'gif'];

            const file = req.files.file;
            const splitedFile = file.name.split('.');
            const fileExtension = splitedFile[splitedFile.length - 1];

            if (extensions.includes(fileExtension)) {
                fileName = file.name;
                sharp(file.data).resize(100, 100, {fit: 'cover'}).toFile("./files/" + fileName);
            }
            else {
                errors.push('incorrect_file_format');
            }
        }
        else {
            fileName = 'incognito.gif';
        }
    }

    // save post
    if (errors.length === 0) {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            image: fileName,
            createdAt: calculateDate()
        });

        await post.save();
    }

    if (errors.length === 0) res.send({
        success: true,
        message: 'Post was successfully added!'
    });
    else res.send({
        success: false,
        errors: errors
    })
}