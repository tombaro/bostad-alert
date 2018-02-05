var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var searchModelSchema = new Schema({
    areas: [String],
    minRooms: String,
    maxRent: Number,
    user: {type: Schema.ObjectId, ref: 'UserModel'}
});

module.exports = mongoose.model('SearchModel', searchModelSchema);
