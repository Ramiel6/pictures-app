var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
// define the schema for our user model
var Account = new Schema({
    local:{
        email: String,
        password: String,
        name: { type:String, default:'Unknown' },
        profilePicture: String
    },
    google: {
        id : String,
        token: String,
        email: String,
        name: String
    },
    github: {
        id : String,
        token: String,
        email: String,
        name: String
    }
    
});
// methods ======================
// generating a hash
Account.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
Account.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Account', Account);