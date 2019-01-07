const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID : String,
    userName : String,
    credits: {type: Number, default: 0}
});

module.exports = mongoose.model('users', userSchema);
