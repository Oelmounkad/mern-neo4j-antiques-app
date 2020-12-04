const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
  names: [{ type: Schema.Types.ObjectId, ref: 'Name' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  functions: [{ type: Schema.Types.ObjectId, ref: 'Function' }]
});

module.exports = mongoose.model('Person', personSchema);
