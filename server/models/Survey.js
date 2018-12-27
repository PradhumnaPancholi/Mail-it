const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./Recipients');

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [recipientSchema],
  positive: { type: Number, default: 0},
  negative: { type: Number, default: 0},
  _user: { type: Schema.Types.ObjectId, ref: 'User'},
  dateSent: Date,
  lastResponse: Date
});

mongoose.model('surveys', surveySchema);
