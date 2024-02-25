const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accounts = new Schema({
    full_name: { type: String },
    pin: { type: Number },
    avatar: { type: String },
    age: { type: Number },
    state: { type: Boolean }
});

module.exports = mongoose.model('Accounts', accounts);