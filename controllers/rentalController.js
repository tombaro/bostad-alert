var Rental = require('../models/rental');

exports.index = function (req, res) {
    // https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Home_page
    // https://blog.risingstack.com/mastering-async-await-in-nodejs/
    async function countRentals () {
        try {
            const rentals = await Rental.count();
            res.render('index', {title: 'Lediga lägenheter', data: rentals});
        } catch (e) {
            res.render('index', {title: e});
        }
    }
};

exports.rentalList = function (req, res) {
    res.send('Not implemented, list all rentals');
};

exports.rentalCreate = function (req, res) {
    res.send('Not implemented, create rental');
};
