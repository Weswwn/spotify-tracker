const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
var uniqueValidator = require('mongoose-unique-validator');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var userSchema = new mongoose.Schema({
    userID: {type: String, unique: true },
    userEmail: String,
    userCounter: String,
    userTopTracksShortTerm: [{}],
    userTopTracksMediumTerm: [{}],
    userTopTracksLongTerm: [{}],
    userTopArtistsShortTerm: [{}],
    userTopArtistsMediumTerm: [{}],
    userTopArtistsLongTerm: [{}],
});

userSchema.plugin(uniqueValidator);

var User = mongoose.model('User', userSchema);

module.exports = {
    db: db,
    User: User
};