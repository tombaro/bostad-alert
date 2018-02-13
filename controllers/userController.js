var User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display create form on GET.
exports.userCreateForm = function (req, res, next) {
    res.render('users-form', { title: 'Skapa användare' });
};

// Handle create form on POST.
exports.userCreate = [
    // Validate input.
    body('name', 'Name is required').isLength({min: 1}).trim(),
    body('email', 'Email must be valid').isEmail().trim(),

    // Sanitize input.
    sanitizeBody('name').trim().escape(),
    sanitizeBody('email').trim().escape(),

    // Process inputs.
    (req, res, next) => {
        // Extract errors from request.
        const errors = validationResult(req);

        // Create object.
        var user = new User(
            { name: req.body.name,
                email: req.body.email }
        );

        if (!errors.isEmpty()) {
            res.render('users-form', { title: 'Skapa användare', user: user, errors: errors.array() });
        } else {
            // Check if already exists.
            User.findOne({ 'email': req.body.email })
                .exec(function (err, foundUser) {
                    if (err) {
                        return next(err);
                    }
                    if (foundUser) {
                    // Exists.
                        res.render('users-form', { title: 'Finns redan' });
                    } else {
                        user.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            // Saved.
                            console.log('try save');
                            res.redirect(user.url);
                        });
                    }
                });
        }
    }
];

exports.userList = function (req, res, next) {
    User.find({}, 'name email')
        // .populate('')
        .exec(function (err, userList) {
            if (err) {
                return next(err);
            }
            console.log(userList);
            res.render('users', {title: 'Lista på användare', users: userList});
        });
};

exports.userDetail = async function (req, res, next) {
    let user = await getUser(req);

    // Nothing found in db.
    if (user == null) {
        var err = new Error('Not found');
        err.status = 404;
        return next(err);
    }
    res.render('users-detail', { title: 'Användarinformation', user: user });
};

async function getUser (req) {
    return User.findById(req.params.id);
}
