const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = Schema({
  label: String,
  versions: [{ type: Schema.Types.ObjectId, ref: 'Version' }],
});

module.exports = mongoose.model('Activity', activitySchema);
