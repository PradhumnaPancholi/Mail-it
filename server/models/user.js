const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleID : String,
    userName : String
});

mongoose.model('users', userSchema);
