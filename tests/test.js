const test = require("tape");
const router = require("../src/router.js");
const supertest = require("supertest");

test("is tape working?", function(t) {
  t.equal(1, 1, "1 should equal 1");
  t.end();
});


// testing home route
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

// testing a route that does not exist
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



// testing file routing
// - css
test("style.css file loading as expected", t => {
  supertest(router)
    .get("/public/style.css")
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
    .get("/public/dom.js")
    .expect(200)
    .expect("Content-Type", /application\/javascript/)
    .end((err, res) => {
      t.error(err);
      t.equal(res.statusCode, 200, "Should return 200");
      t.end();
  });
});