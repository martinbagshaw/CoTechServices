const test = require("tape");
const supertest = require("supertest");
const router = require("../src/router.js");
const handlers = require("../src/handlers.js");

// require dom.js
const domFile = require("../public/js/dom.js");



// ____________________
// Test routing (router.js)
// - testing home route
test("Home route returns 200 status code", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
    });
});
// - testing a route that does not exist
test("Invalid url returns 404 status code", t => {
  supertest(router)
    .get("/armadillo")
    .expect(404)
    .expect("Content-Type", /html/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 404, "Should return 404");
      t.end();
    });
});

// - css
test("style.css file loading as expected", t => {
  supertest(router)
    .get("/public/css/style.css")
    .expect(200)
    .expect("Content-Type", /css/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
  });
});
// - js
test("dom.js file loading as expected", t => {
  supertest(router)
    .get("/public/js/dom.js")
    .expect(200)
    .expect("Content-Type", /application\/javascript/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
  });
});

// - testing a POST request with /search in the url
test("POST request from services click loading Wikipedia json", t => {
  supertest(router)
    .post("/search/Research")
    .expect(200)
    .expect("Content-Type", /application\/json/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
  });
});
// - POST request with incorrect url
test("POST request with incorrect url returns a 404", t => {
  supertest(router)
    .post("/something")
    .expect(404)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 404, "Should return 404");
      t.end();
  });
});






// ____________________
// Test handers (handlers.js)
// - index.html and files covered by router tests
test("test handleCoTechRequest() from local json file", t => {
  supertest(handlers.handleCoTechRequest)
    .get("/src/services.json")
    .expect(200)
    .expect("Content-Type", /application\/json/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
  });
});

// - test Wikipedia request
test("test handleWikiRequest() with valid url", t => {
  supertest(handlers.handleWikiRequest)
    .get("/search/Information_security")
    .expect(200)
    .expect("Content-Type", /application\/json/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
  });
});






// ____________________
// Test helper functions (dom.js)
// - wikipedia formatting
test('wikipedia formatting with one word', function(t){
  const actual = domFile.wikiFormat('Research');
  const expected = 'Research';
  t.equals(actual, expected), 'wikipedia formatting with one word title';
  t.end();
})
test('wikipedia formatting with two words', function(t){
  const actual = domFile.wikiFormat('Game Design');
  const expected = 'Game_design';
  t.equals(actual, expected), 'wikipedia formatting with two word title';
  t.end();
})


// - location formatting
test('location.href without #', function(t){
  const actual = domFile.locationFormat('http://localhost:4000/');
  const expected = 'http://localhost:4000/';
  t.equals(actual, expected), 'location.href without # returns same as input';
  t.end();
})

test('location.href with #', function(t){
  const actual = domFile.locationFormat('http://localhost:4000/#service_Research');
  const expected = 'http://localhost:4000/';
  t.equals(actual, expected), 'location.href without # returns string before but not including #';
  t.end();
})