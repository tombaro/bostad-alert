var Search = require('../models/search');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display create form on GET.
exports.searchCreateForm = function (req, res, next) {
    res.render('search-form', { title: 'Skapa sökning' });
};

// Handle create form on POST.
exports.searchCreate = [
    // Validate input.
    body('areas', 'area is required').isLength({min: 1}).trim(),
    body('minRooms', 'Must be a number').isNumeric().trim(),
    body('maxRent', 'Must be a number').isNumeric().trim(),

    // Sanitize input.
    sanitizeBody('areas').trim().escape(),
    sanitizeBody('minRooms').trim().escape(),
    sanitizeBody('maxRent').trim().escape(),

    // Process inputs.
    (req, res, next) => {
        // Extract errors from request.
        const errors = validationResult(req);

        // Create object.
        var search = new Search(
            { areas: req.body.areas,
                minRooms: req.body.minRooms,
                maxRent: req.body.maxRent }
        );

        if (!errors.isEmpty()) {
            res.render('search-form', { title: 'Skapa sökning', search: search, errors: errors.array() });
        } else {
            // Check if already exists.
            Search.findOne({ 'areas': req.body.areas })
                .exec(function (err, foundSearch) {
                    if (err) {
                        return next(err);
                    }
                    if (foundSearch) {
                    // Exists.
                        res.render('search-form', { title: 'Finns redan' });
                    } else {
                        search.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            // Saved.
                            res.redirect(search.url);
                        });
                    }
                });
        }
    }
];

exports.searchList = function (req, res, next) {
    Search.find({}, 'areas minRooms maxRent')
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
