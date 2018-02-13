var Rental = require('../models/rental');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// module.exports.index = async function (req, res) {
//     let rentals = await countRentals();
//     res.render('rentals', {title: 'Lediga lägenheter', data: rentals});
// };
//     // https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Displaying_data/Home_page
//     // https://blog.risingstack.com/mastering-async-await-in-nodejs/

// Display create form on GET.
exports.rentalCreateForm = function (req, res, next) {
    res.render('rentals-form', { title: 'Skapa ledig lägenhet (för test)' });
};

// Handle create form on POST.
exports.rentalCreate = [
    // Validate input.
    body('area', 'Area is required').isLength({min: 1}).trim(),

    // Sanitize input.
    sanitizeBody('area').trim().escape(),

    // Process inputs.
    (req, res, next) => {
        // Extract errors from request.
        const errors = validationResult(req);

        // Create object.
        var rental = new Rental(
            { area: req.body.area }
        );

        if (!errors.isEmpty()) {
            res.render('rentals-form', { title: 'Skapa ledig lägenhet (test)', rental: rental, errors: errors.array() });
        } else {
            // Check if already exists.
            Rental.findOne({ 'area': req.body.area })
                .exec(function (err, foundRental) {
                    if (err) {
                        return next(err);
                    }
                    if (foundRental) {
                    // Exists.
                        res.render('rentals-form', { title: 'Finns redan' });
                    } else {
                        rental.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            // Saved.
                            console.log('try save');
                            res.redirect(rental.detailUrl);
                        });
                    }
                });
        }
    }
];

exports.rentalList = function (req, res, next) {
    Rental.find({}, 'Stadsdel Gatuadress Yta AntalRum Hyra Url')
        // .populate('')
        .exec(function (err, rentalList) {
            if (err) {
                return next(err);
            }
            console.log(rentalList);
            res.render('rentals', {title: 'Lista på lediga lägenheter', rentals: rentalList});
        });
};

exports.rentalSearch = async function (req, res, next) {
    let search = req.params.search;
    if (req.body.search) {
        search = req.body.search;
        res.redirect('/rentals/search/' + search);
        return;
    }
    let results = await getRentals(search);
    // Nothing found in db.
    if (results == null) {
        var err = new Error('Not found');
        err.status = 404;
        return next(err);
    }

    res.render('rentals', { title: 'Filtrerad lista', term: search, rentals: results });
};

exports.rentalDetail = async function (req, res, next) {
    let rental = await getRental(req);

    // Nothing found in db.
    if (rental == null) {
        var err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    res.render('rentals-detail', { title: 'Lägenhetsinformation', rental: rental });
};

async function getRental (req) {
    return Rental.findById(req.params.id);
}

async function getRentals (search) {
    return Rental
        .find({ $or: [{ Gatuadress: new RegExp(search, 'i') }, { Stadsdel: new RegExp(search, 'i') }] })
        .exec();
}

// async function countRentals () {
//     return Rental.count();
// }
