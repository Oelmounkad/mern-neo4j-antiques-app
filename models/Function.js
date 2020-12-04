const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const functionSchema = Schema({
  label: String,
  versions: [{ type: Schema.Types.ObjectId, ref: 'Version' }],
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }]
});

module.exports = mongoose.model('Function', functionSchema);
