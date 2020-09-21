// Import review model
Review = require('./reviewModel');
// Handle index actions
exports.index = function (req, res) {
    Review.get(function (err, reviews) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Reviews retrieved successfully",
            data: reviews
        });
    });
};
// Handle create review actions
exports.new = function (req, res) {
    var review = new Review();
    review.name = req.body.name ? req.body.name : review.name;
    review.platform = req.body.platform;
    review.price = req.body.price;
    review.description = req.body.description;

    review.save(function (err) {
        res.json({
            message: 'New game review created!',
            data: review
        });
    });
};
// Handle view review info
exports.view = function (req, res) {
    Review.findById(req.params.review_id, function (err, review) {
        if (err)
            res.send(err);
        res.json({
            message: 'Review details loading..',
            data: review
        });
    });
};
// Handle update review info
exports.update = function (req, res) {
    Review.findById(req.params.review_id, function (err, review) {
        if (err)
            res.send(err);
        review.name = req.body.name ? req.body.name : review.name;
        review.platform = req.body.platform;
        review.price = req.body.price;
        review.description = req.body.description;
        // save the review and check for errors
        review.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Review Info updated',
                data: review
            });
        });
    });
};
// Handle delete review
exports.delete = function (req, res) {
    Review.remove({
        _id: req.params.review_id
    }, function (err, review) {
        if (err)
            res.send(err);
        res.json({
            status: "Successfully deleted",
            message: 'Review deleted'
        });
    });
};