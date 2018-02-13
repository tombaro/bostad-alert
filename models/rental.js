var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var rentalModelSchema = new Schema({
    Stadsdel: String,
    Gatuadress: String,
    AntalRum: Number,
    Yta: Number,
    Hyra: Number,
    AnnonseradTill: Date,
    Url: String,
    Vanlig: Boolean,
    Hiss: Boolean,
    Balkong: Boolean
}, { collection: 'allaannonser' });

rentalModelSchema.index({ Stadsdel: 'text', Gatuadress: 'text' });

rentalModelSchema
    .virtual('ytaString')
    .get(function () {
        return this.Yta + ' kvm';
    });

rentalModelSchema
    .virtual('hyraString')
    .get(function () {
        return this.Hyra + ' kr';
    });

rentalModelSchema
    .virtual('detailUrl')
    .get(function () {
        return '/rentals/' + this._id;
    });

rentalModelSchema
    .virtual('url')
    .get(function () {
        return 'https://bostad.stockholm.se' + this.Url;
    });

module.exports = mongoose.model('RentalModel', rentalModelSchema);
