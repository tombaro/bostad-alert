var Rental = require('../models/rental');

// module.exports.index = async function (req, res) {
//     let rentals = await countRentals();
//     res.render('rentals', {title: 'Lediga lägenheter', data: rentals});
// };
//     // https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Home_page
//     // https://blog.risingstack.com/mastering-async-await-in-nodejs/

exports.rentalList = function (req, res, next) {
    Rental.find({}, 'area street')
        // .populate('')
        .exec(function (err, rentalList) {
            if (err) {
                return next(err);
            }
            res.render('rentals', {title: 'Lista på lediga lägenheter', rentals: rentalList});
        });
};

exports.rentalCreate = function (req, res) {
    res.send('Not implemented, create rental');
};

// async function countRentals () {
//     return Rental.count();
// }
