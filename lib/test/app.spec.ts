export {};
const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require("../app").default;
var expect = chai.expect;
chai.use(chaiHttp);

describe("API Routes", function() {
  describe("GET /api/v1.0/tasks", function() {
    it("should return all tasks", function(done) {
      chai
        .request(server)
        .get("/todo/api/v1.0/tasks")
        .then(function (res) {
          expect(res).to.have.status(200);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("GET /api/v1.0/tasks/:id", function() {
    it("should return one tasks", function(done) {
      chai
        .request(server)
        .get("/todo/api/v1.0/tasks/1")
        .then(function (res) {
          expect(res).to.have.status(200);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("POST /api/v1.0/tasks", function() {
    it("should post tasks", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          _method: "post",
          todoTitle: "123",
          todoDescription: "123",
          complete: false
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("PUT /api/v1.0/tasks/:id", function() {
    it("should update all tasks", function(done) {
      chai
        .request(server)
        .put("/todo/api/v1.0/tasks/3")
        .set("X-API-Key", "foobar")
        .send({
          _method: "put",
          todoTitle: "123",
          todoDescription: "123",
          complete: false
        })
        .then(function (res) {
          expect(res).to.have.status(200);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("DELETE /api/v1.0/tasks/:id", function() {
    it("should delete all tasks", function(done) {
      chai
        .request(server)
        .delete("/todo/api/v1.0/tasks/1")
        .then(function (res) {
          expect(res).to.have.status(200);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

});
