const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  activityName: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Activity', activitySchema);
