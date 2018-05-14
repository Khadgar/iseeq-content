var mongoose = require('mongoose');

module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var ContentModel = new Schema({
        company: String,
        displayName: String,
        data: Array
    }, {
        collection: 'content'
    });

    var model = mongoose.model('content', ContentModel);

    return model;
};