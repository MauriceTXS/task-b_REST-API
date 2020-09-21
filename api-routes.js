// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'Review hub API is working',
        message: 'Welcome to review hub API',
    });
});
// Import review controller
var reviewController = require('./reviewController');
// review routes
router.route('/reviews')
    .get(reviewController.index)
    .post(reviewController.new);
router.route('/reviews/:review_id')
    .get(reviewController.view)
    .put(reviewController.update)
    .delete(reviewController.delete);
// Export API routes
module.exports = router;