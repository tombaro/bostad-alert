var rp = require('request-promise');

var Rental = require('../models/rental');

const url = 'https://bostad.stockholm.se/Lista/AllaAnnonser';
// Do this every x hour.

// Get rental data from external api and save.
function saveRentals () {
    // First remove all old.
    Rental.remove({}, function (err) {
        if (err) {
            return err;
        }
        const options = {
            uri: url,
            json: true
        };

        return rp(options)
            .then(function (rentals) {
                for (let index = 0; index < rentals.length; index++) {
                    // Create object.
                    var rental = new Rental(
                        {
                            Stadsdel: rentals[index].Stadsdel,
                            Gatuadress: rentals[index].Gatuadress,
                            AntalRum: rentals[index].AntalRum,
                            Yta: rentals[index].Yta,
                            Hyra: rentals[index].Hyra,
                            AnnonseradTill: rentals[index].AnnonseradTill,
                            Url: rentals[index].Url,
                            Vanlig: rentals[index].Vanlig,
                            Hiss: rentals[index].Hiss,
                            Balkong: rentals[index].Balkong
                        }
                    );
                    saveRental(rental);
                }
            })
            .catch(function (error) {
                console.log('failed');
                return error;
            });
    });
}
// Save data to db.
function saveRental (rental) {
    rental.save(function (err) {
        if (err) {
            console.error(err);
        }
        // Saved.
        console.log('saved with id:' + rental._id);
    });
}

module.exports = saveRentals;
