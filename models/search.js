var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var searchModelSchema = new Schema({
    Stadsdelar: [String],
    minRooms: String,
    maxRent: Number,
    user: {type: Schema.ObjectId, ref: 'UserModel'}
});

searchModelSchema
    .virtual('url')
    .get(function () {
        return '/searches/' + this._id;
    });

module.exports = mongoose.model('SearchModel', searchModelSchema);
