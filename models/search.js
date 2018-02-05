import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var searchModelSchema = new Schema({
    areas: [String],
    minRooms: String,
    maxRent: Number
});

module.exports = mongoose.model('SearchModel', searchModelSchema);
