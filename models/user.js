var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userModelSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    slackKey: String
});

userModelSchema
    .virtual('url')
    .get(function () {
        return '/users/' + this._id;
    });

module.exports = mongoose.model('UserModel', userModelSchema);
