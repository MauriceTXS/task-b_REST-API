process.env.NODE_ENV = 'test';

// Import dependencies for testing
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let mongoose = require('mongoose');
let config = require('config');
const { restart } = require('nodemon');

// Configure chai
chai.use(chaiHttp);
chai.should();

mongoose.connect(config.dbConfig, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.dropDatabase();

describe("Add a review", () => {
    describe("POST /api/reviews", () => {
        it("Should add a review into the database", (done) => {
            let review = {
                name: "testName",
                platform: "testPlatform",
                price: "8888",
                description: "This is a test"
            }
            chai.request(server)
                .post('/api/reviews')
                .send(review)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.name.should.be.eql("testName");
                    res.body.data.platform.should.be.eql("testPlatform");
                    res.body.data.price.should.be.eql("8888");
                    res.body.data.description.should.be.eql("This is a test");
                    done();
                });
        });
    });
});

describe("Get all reviews", () => {
    describe("GET /api/reviews", () => {
        it("Should get all reviews from the database", (done) => {
             chai.request(server)
                 .get('/api/reviews')
                 .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.length.should.be.eql(1);
                    done();
                  });
         });
    });
});

describe("Update an existing review", () => {
    describe("PUT /api/reviews/{id}", () => {
        it("Should update the review with specified id", (done) => {
            let updateReview = {
                name: "updatedName",
                platform: "updatedPlatform",
                price: "11",
                description: "This is an updated description"
            }
            chai.request(server)
                .get('/api/reviews')
                .end((err, res) => {
                    res.should.have.status(200);
                    id = res.body.data[0]._id;
                    request_url = '/api/reviews/' + id;
                    chai.request(server)
                        .put(request_url)
                        .send(updateReview)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.data._id.should.be.eql(id)
                            res.body.data.name.should.be.eql("updatedName");
                            res.body.data.platform.should.be.eql("updatedPlatform");
                            res.body.data.price.should.be.eql("11");
                            res.body.data.description.should.be.eql("This is an updated description");
                        })
                    done();
                });
        });
    });
});

describe("Delete an existing review", () => {
    describe("DEL /api/reviews/{id}", () => {
        it("Should delete the review with the specified id", (done) => {
            chai.request(server)
                .get('/api/reviews')
                .end((err, res) => {
                    res.should.have.status(200);
                    id = res.body.data[0]._id;
                    request_url = '/api/reviews/' + id;
                    chai.request(server)
                        .delete(request_url)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.status.should.be.eql('success')
                            done();
                        })
                });
        });
        it("Should have no reviews left", (done) => {
            chai.request(server)
                .get('/api/reviews')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });

    });
});