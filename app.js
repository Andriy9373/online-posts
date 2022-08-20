const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

const DATABASE = 'mongodb+srv://user:user@vueexpress.shuhjwb.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(DATABASE)
    .then(() => console.log('DB connected'))
    .catch(error => console.log(error))

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/posts', require('./routes/posts/get-posts'));
app.use('/api/posts', require('./routes/posts/delete-post'));
app.use('/api/posts/create', require('./routes/posts/create-post'));
app.use('/api/contacts', require('./routes/contacts/get-contacts'));

app.listen(PORT, error => {
    error ? console.log(error) : console.log(`Server is running on port ${PORT}`);
})