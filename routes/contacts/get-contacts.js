const Contact = require('../../models/Contact');

module.exports = async (req, res) => {
    Contact
        .find()
        .then(contacts => res.status(200).send(contacts))
        .catch(error => console.log(error))
}