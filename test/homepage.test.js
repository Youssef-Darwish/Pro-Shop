const request = require("supertest");
const app = require("../backend/server");

describe("homepage", function () {
  it("welcomes the user", function (done) {
    request(app).get("/api/products").expect(200, done);
  });
});
