const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [String],
  positive: { type: Number, default: 0},
  negative: { type: Number, default: 0}
});

mongoose.model('surveys', surveySchema);
