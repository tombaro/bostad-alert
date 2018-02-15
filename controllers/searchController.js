const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var Search = require('../models/search');
var User = require('../models/user');

// Display create form on GET.
exports.searchCreateForm = async function (req, res, next) {
    // Get all users.
    let users = await getUsers();

    res.render('search-form', { title: 'Skapa sökning', users: users });
};

// Handle create form on POST.
exports.searchCreate = [
    // Validate input.
    body('Stadsdelar', 'area is required').isLength({min: 1}).trim(),
    body('minRooms', 'Must be a number').isNumeric().trim(),
    body('maxRent', 'Must be a number').isNumeric().trim(),

    // Sanitize input.
    sanitizeBody('Stadsdelar').trim().escape(),
    sanitizeBody('minRooms').trim().escape(),
    sanitizeBody('maxRent').trim().escape(),

    // Process inputs.
    (req, res, next) => {
        // Extract errors from request.
        const errors = validationResult(req);

        // Create object.
        var search = new Search(
            { Stadsdelar: [req.body.Stadsdelar], // TODO: Create array of strings.
                minRooms: req.body.minRooms,
                maxRent: req.body.maxRent }
        );

        if (!errors.isEmpty()) {
            res.render('search-form', { title: 'Skapa sökning', search: search, errors: errors.array() });
        } else {
            // Check if already exists. Why???
            // Search.findOne({ 'Stadsdel': req.body.Stadsdel })
            //     .exec(function (err, foundSearch) {
            //         if (err) {
            //             return next(err);
            //         }
            //         if (foundSearch) {
            //         // Exists.
            //             res.render('search-form', { title: 'Finns redan' });
            //         } else {
            search.save(function (err) {
                if (err) {
                    return next(err);
                }
                // Saved.
                res.redirect(search.url);
            });
            //     }
            // });
        }
    }
];

exports.searchList = function (req, res, next) {
    Search.find({}, 'Stadsdelar minRooms maxRent')
        // .populate('')
        .exec(function (err, searchList) {
            if (err) {
                return next(err);
            }
            res.render('searches', {title: 'Lista på sökningar', searches: searchList});
        });
};

exports.searchDetail = async function (req, res, next) {
    let search = await getSearch(req);

    // Nothing found in db.
    if (search == null) {
        var err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    res.render('searches-detail', { title: 'Sökningar', search: search });
};

async function getSearch (req) {
    return Search.findById(req.params.id);
}

async function getUsers () {
    return User.find({})
        .exec();
}
