const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 5000;

const DATABASE = 'mongodb+srv://user:user@vueexpress.shuhjwb.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(DATABASE)
    .then(() => console.log('DB is connected'))
    .catch(error => console.log(error))

//Middleware
app.use(express.json());
app.use(cors());
app.use(fileUpload({createParentPath: true}));

//Routes
app.get('/api/posts', require('./routes/posts/get-posts'));
app.get('/api/posts/:id', require('./routes/posts/get-single-post'));
app.delete('/api/posts/:id', require('./routes/posts/delete-post'));
app.post('/api/posts/create', require('./routes/posts/create-post'));
app.get('/api/contacts', require('./routes/contacts/get-contacts'));

app.listen(PORT, error => {
    error ? (error) : console.log(`Server is running on port ${PORT}`);
})