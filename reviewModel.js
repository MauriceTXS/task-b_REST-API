var mongoose = require('mongoose');
// Setup schema
var reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    price: String,
    description: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});
// Export Review model
var Review = module.exports = mongoose.model('review', reviewSchema);
module.exports.get = function (callback, limit) {
    Review.find(callback).limit(limit);
}