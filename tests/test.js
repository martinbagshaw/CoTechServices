const test = require("tape");
const router = require("../src/router.js");
const supertest = require("supertest");

test("is tape working?", function(t) {
  t.equal(1, 1, "1 should equal 1");
  t.end();
});

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
