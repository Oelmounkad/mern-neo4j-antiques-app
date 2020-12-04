const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = Schema({
  name: String,
  source: { type: Schema.Types.ObjectId, ref: 'Source' }
});

module.exports = mongoose.model('Name', nameSchema);
