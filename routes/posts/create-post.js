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
    let fileName;
    if (!req.files) fileName = 'incognito.gif';
    else {
        let file = req.files.file;
        fileName = file.name;
        sharp(file.data).resize(100, 100, {fit: 'cover'}).toFile("./files/" + fileName);
    }
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        image: fileName,
        createdAt: calculateDate()
    });
  
    const savePost = await post.save();
    res.status(201).json(savePost);
}