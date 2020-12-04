const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = Schema({
  timespan: String,
  from: String,
  to: String,
  pullreasons: [String],
  pushreasons: [String],
  type: String,
  accomodation_mode: String,
  assimilation: String,
  source: { type: Schema.Types.ObjectId, ref: 'Source' }
});

module.exports = mongoose.model('Detail', detailSchema);