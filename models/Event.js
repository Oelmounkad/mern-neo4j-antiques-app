const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = Schema({
  label: String,
  versions : { type: Schema.Types.ObjectId, ref: 'Version' }
});

module.exports = mongoose.model('Event', eventSchema);
