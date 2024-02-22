const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    email: { type: String },
    password: { type: String },
    pin: { type: Numeric },
    name: { type: String },
    last_name: { type: String },
    country: { type: String },
    birthdate: { type: Data },
    accounts: { type: Number },
    playlists: { type: Number },
    state: {type: Boolean }
});

module.exports = mongoose.model('User', user);