const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const versionSchema = Schema({
  timespan: String,
  location: String,
  source : { type: Schema.Types.ObjectId, ref: 'Source' }
});

module.exports = mongoose.model('Version', versionSchema);
