"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const connectionString = {
    connectionString: "postgres://rdgqlzgqkeuxqz:8b89bd358daa419edf7f5f8b879cde3fd53db22b6eb42f0aa3be51b6de8390a4@ec2-54-225-241-25.compute-1.amazonaws.com:5432/d7knd1j7cm9u4c",
    ssl: true,
};
// "postgres://ycdrsdkz:VCNlVKZ--PJLCHozzG9gQVrKhU_OEJdj@stampy.db.elephantsql.com:5432/ycdrsdkz";
class TodoController {
    addNewTodo(req, res) {
        const results = [];
        const { todoTitle, todoDescription } = req.body;
        const data = {
            todoTitle,
            todoDescription,
            complete: false
        };
        const client = new pg_1.Client(connectionString);
        client.connect(error => {
            if (error) {
                return res.status(500).json({ success: false, error: error });
            }
            client
                .query("INSERT INTO todoList(todoTitle, todoDescription, complete) values($1, $2, $3)", [data.todoTitle, data.todoDescription, data.complete])
                .then(result1 => {
                return res.send({ success: true, msg: 'Todo Added Successfully' });
            })
                .catch(err => {
                return res.json({ success: false, data: err });
            });
        });
    }
    getTodos(req, res) {
        const results = [];
        const client = new pg_1.Client(connectionString);
        client.connect(error => {
            if (error) {
                return res.status(500).json({ success: false, error: error });
            }
            client.query("SELECT * FROM todoList ORDER BY id asc")
                .then(result2 => {
                result2.rows.forEach(row => {
                    results.push(row);
                });
                return res.status(200).json(results);
            })
                .catch(err => {
                return res.json({ success: false, data: err });
            });
        });
    }
    getTodoWithID(req, res) {
        const id = req.params.id;
        var client = new pg_1.Client(connectionString);
        client.connect((error) => {
            if (error) {
                return res.status(500).json({ success: false, error: error });
            }
            client.query('SELECT * FROM todoList where id=($1)', [id]).then((result) => {
                return res.status(200).json(result.rows);
            }).catch((err) => {
                return res.status(500).json({ success: false, data: err });
            });
        });
    }
    updateTodo(req, res) {
        const results = [];
        const id = req.params.id;
        const { todoTitle, todoDescription, complete } = req.body;
        const data = {
            todoTitle,
            todoDescription,
            complete
        };
        console.log(data);
        const client = new pg_1.Client(connectionString);
        client.connect(() => {
            client.query("UPDATE todoList SET todoTitle=($1), todoDescription=($2), complete=($3) where id=($4)", [data.todoTitle, data.todoDescription, data.complete, id]).then(err => {
                return res.status(200).json({ success: true, msg: "UPDATED!" });
            }).catch(err => {
                return res.status(500).json({ success: false, data: err });
            });
        });
    }
    deleteTodo(req, res) {
        const results = [];
        const id = req.params.id;
        var client = new pg_1.Client(connectionString);
        client.connect(() => {
            client.query("DELETE FROM todoList WHERE id=($1)", [id])
                .then(err => {
                return res.status(200).json({ success: true, msg: "DELETED!" });
            })
                .catch(err => {
                return res.status(500).json({ success: false, data: err });
            });
        });
    }
}
exports.TodoController = TodoController;
//# sourceMappingURL=todoController.js.map