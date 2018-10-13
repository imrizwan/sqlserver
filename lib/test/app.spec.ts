export {};
const chai = require("chai");
import { Client } from "pg";
const chaiHttp = require("chai-http");
const server = require("../app").default;
var expect = chai.expect;
chai.use(chaiHttp);
var TASKS, TASK, ID, TITLE, DESC, DONE;

describe("API Routes", function() {

    describe('Test for Databse Connectivity', function(){
         it('should connect to database', function(done){
          var client = new Client({
            connectionString: "postgres://rdgqlzgqkeuxqz:8b89bd358daa419edf7f5f8b879cde3fd53db22b6eb42f0aa3be51b6de8390a4@ec2-54-225-241-25.compute-1.amazonaws.com:5432/d7knd1j7cm9u4c",
            ssl: true,
          });
          client.connect(function(err) {
            if (err) {
              return console.error("could not connect to postgres", err);
            }
            client.end();
            done();
          });
         });
     })

     describe('Test for Databse Connectivity', function(){
      it('should connecting to database and running query', function(done){
       var client = new Client({
         connectionString: "postgres://rdgqlzgqkeuxqz:8b89bd358daa419edf7f5f8b879cde3fd53db22b6eb42f0aa3be51b6de8390a4@ec2-54-225-241-25.compute-1.amazonaws.com:5432/d7knd1j7cm9u4c",
         ssl: true,
       });
       client.connect(function(err) {
         if (err) {
           return console.error("could not connect to postgres", err);
         }
         client.query(
          "SELECT NOW()",
          function(err) {
            if (err) {
              return console.error("error running query", err);
            }
            client.end();
          }
        );
         done();
       });
      });
  })

  describe("getTodos GET /api/v1.0/tasks", function() {
    it("should return all tasks and get status 200", function(done) {
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

  describe("getTodos GET /api/v1.0/tasks", function() {
    it("should return all tasks and get an array", function(done) {
      chai
        .request(server)
        .get("/todo/api/v1.0/tasks")
        .then(function (res) {
          expect(res.body).to.be.a('array');
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
          ID = res.body[0].id;
          TASK = res.body[0];
          TITLE = res.body[0].todotitle;
          DESC = res.body[0].tododescription;
          DONE = res.body[0].complete;
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo
    it("should post and get json confirmation", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: "123",
          todoDescription: "123",
        })
        .then(function (res) {
          expect(res.body[1]).to.eql({success: true, msg: 'Todo Added Successfully'});
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo
    it("should not post because title is missing", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoDescription: "123",
        })
        .then(function (res) {
          expect(res.body).to.eql({ success: false, error: "Title is Missing" });
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo
    it("should not post because Description is missing", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: "123",
        })
        .then(function (res) {
          expect(res.body).to.eql({ success: false, error: "Description is Missing" });
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo
    it("should not post because Title and Description fields are missing", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
        })
        .then(function (res) {
          expect(res.body).to.eql({ success: false, error: "Both fields are Missing" });
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo
    it("should not post because title is empty", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: "",
          todoDescription: "123",
        })
        .then(function (res) {
          expect(res.body).to.eql({ success: false, error: "Title is Missing" });
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo
    it("should not post because Description is empty", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: "123",
          todoDescription: "",
        })
        .then(function (res) {
          expect(res.body).to.eql({ success: false, error: "Description is Missing" });
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo //400
    it("should not post because Title is missing and returning status 400 (Bad Request)", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoDescription: "123",
        })
        .then(function (res) {
          expect(res).to.have.status(400);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo //400
    it("should not post because Description is missing and returning status 400 (Bad Request)", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: "123",
        })
        .then(function (res) {
          expect(res).to.have.status(400);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo //400
    it("should not post because Title is empty and returning status 400 (Bad Request)", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: "",
          todoDescription: "123"
        })
        .then(function (res) {
          expect(res).to.have.status(400);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo //400
    it("should not post because Description is empty and returning status 400 (Bad Request)", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: "123",
          todoDescription: "",
        })
        .then(function (res) {
          expect(res).to.have.status(400);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("addNewTodo /api/v1.0/tasks", function() {
    //addNewTodo //400
    it("should not post because Title and Description fields are missing and returning status 400 (Bad Request)", function(done) {
      chai
        .request(server)
        .post("/todo/api/v1.0/tasks")
        .set("X-API-Key", "foobar")
        .send({
        })
        .then(function (res) {
          expect(res).to.have.status(400);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("getTodoWithID GET /api/v1.0/tasks/:id", function() {
    it("should return one task", function(done) {
      chai
        .request(server)
        .get("/todo/api/v1.0/tasks/"+ID)
        .then(function (res) {
          expect(res).to.have.status(200);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("getTodoWithID GET /api/v1.0/tasks/:id", function() {
    it("should return and include title, description & complete", function(done) {
      chai
        .request(server)
        .get("/todo/api/v1.0/tasks/"+ID)
        .then(function (res) {
          expect(res.body[0]).to.be.an('object').that.includes({
            id: ID,
            todotitle: TITLE,
            tododescription: DESC,
            complete: DONE
          });
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("getTodoWithID GET /api/v1.0/tasks/:id", function() {
    it("should return one task and get an array", function(done) {
      chai
        .request(server)
        .get("/todo/api/v1.0/tasks/"+ID)
        .then(function (res) {
          expect(res.body).to.be.a('array');
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("getTodoWithID GET /api/v1.0/tasks/:id", function() {
    it("should not return one task and get Not Found error", function(done) {
      chai
        .request(server)
        .get("/todo/api/v1.0/tasks/090078601")
        .then(function (res) {
          expect(res.body).to.eql({ success: false, msg: "Task Not Found!" });
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("getTodoWithID GET /api/v1.0/tasks/:id", function() {
    it("should not return one task and get status 404", function(done) {
      chai
        .request(server)
        .get("/todo/api/v1.0/tasks/090078601")
        .then(function (res) {
          expect(res).to.have.status(404);
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("updateTodo PUT /api/v1.0/tasks/:id", function() {
    it("should update one task and get status 200", function(done) {
      chai
        .request(server)
        .put("/todo/api/v1.0/tasks/"+ID)
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: TITLE,
          todoDescription: DESC,
          complete: DONE
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

  describe("updateTodo PUT /api/v1.0/tasks/:id", function() {
    //updateTodo
    it("should update and get json confirmation", function(done) {
      chai
        .request(server)
        .put("/todo/api/v1.0/tasks/"+ID)
        .set("X-API-Key", "foobar")
        .send({
          todoTitle: TITLE,
          todoDescription: DESC,
        })
        .then(function (res) {
          expect(res.body).to.eql({success: true, msg: 'UPDATED!'});
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

  describe("DELETE /api/v1.0/tasks/:id", function() {
    it("should delete one task and return status 200", function(done) {
      chai
        .request(server)
        .delete("/todo/api/v1.0/tasks/"+ID)
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
    it("should delete one task and return json object", function(done) {
      chai
        .request(server)
        .delete("/todo/api/v1.0/tasks/"+ID)
        .then(function (res) {
          expect(res.body).to.eql({success: true, msg: 'DELETED!'});
          done();
       })
       .catch(function (err) {
          throw err;
       });
    });
  });

});
