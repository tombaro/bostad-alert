var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var rentalModelSchema = new Schema({
    area: String,
    street: String,
    rooms: Number,
    size: Number,
    rent: Number,
    lastApplication: Date,
    url: String
});

rentalModelSchema
    .virtual('sizeString')
    .get(function () {
        return this.size + ' kvm';
    });

rentalModelSchema
    .virtual('maxRentString')
    .get(function () {
        return this.rent + ' kr';
    });

rentalModelSchema
    .virtual('detailUrl')
    .get(function () {
        return '/rentals/' + this._id;
    });

module.exports = mongoose.model('RentalModel', rentalModelSchema);
