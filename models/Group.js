const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = Schema({
  members: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  processes: [{ type: Schema.Types.ObjectId, ref: 'Process' }]
});

module.exports = mongoose.model('Group', groupSchema);
