const express = require('express');
const router = express.Router();
const Contact = require('../../models/Contact');

router.get('/', async (req, res) => {
    Contact
        .find()
        .then(contacts => res.status(200).send(contacts))
        .catch(error => console.log(error))
})

module.exports = router;