let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Import Config
let config = require('config');
// Initialise the app
let app = express();
// Import Serverless
let sls = require('serverless-http')

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
var db = config.dbConfig || "mongodb+srv://reviewhubDBAdmin:FUmU1YGljqDLnA7B@reviewhub.2woiq.mongodb.net/reviewhub?retryWrites=true&w=majority"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

// Added check for DB connection
if(!db)
    console.log("There was an error in connecting to the database")
else
    console.log("Database connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to review hub'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestReviewHub on port " + port);
});

// Export my app for testing purposes
module.exports = app;
module.exports.server = sls(app)