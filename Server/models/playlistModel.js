const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlist = new Schema({
    name: { type: String },
    url: { type: String },
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    state: { type: Boolean }
});

module.exports = mongoose.model('Playlist', playlist);