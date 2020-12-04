const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sourceSchema = Schema({
  livre: String,
  page: String
});

module.exports = mongoose.model('Source', sourceSchema);
