var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pictureModelSchema = new Schema({
    picUrl: String,
    linkers: [String],
    description: String,
    tags:[String],
    categorie: String,
    thumbnail: String,
    owner: {id:String, name:String},
    likes: [String],
    createdAt:{type: Date, default: Date.now}
});
module.exports = mongoose.model('picture', pictureModelSchema);