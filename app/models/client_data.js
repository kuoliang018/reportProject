var mongoose = require('mongoose');


// define the schema for our user model
var clientSchema = mongoose.Schema({
    resolution : 'String',
    browserVersion : 'String',
    browserVersion_useragent : 'String',
    browsertype : 'String',
    loadtime : 'String',
    addedTime : 'String',
    pagename : 'String',
    sessionid : 'String'
});

// methods ======================
// generating a hash


// create the model for users and expose it to our app
module.exports = mongoose.model('ClientData', clientSchema);