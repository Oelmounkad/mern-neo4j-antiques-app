const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const processSchema = Schema({
  label: String,
  subprocesses: [{ type: Schema.Types.ObjectId, ref: 'Process' }],
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  details: [{ type: Schema.Types.ObjectId, ref: 'Detail' }]
});

module.exports = mongoose.model('Process', processSchema);