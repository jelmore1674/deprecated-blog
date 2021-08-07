const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    email: String,
    name: String,
    message: String,
});

module.exports =
    mongoose.models.ContactMessage ||
    mongoose.model('ContactMessage', contactSchema);