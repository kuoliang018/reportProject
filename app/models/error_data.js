var mongoose = require('mongoose');


// define the schema for our user model
var errorSchema = mongoose.Schema({
    jsError : 'String',
    addedTime : 'String',
    sessionid : 'String'
});

// methods ======================
// generating a hash


// create the model for users and expose it to our app
module.exports = mongoose.model('error_table', errorSchema);