import { Request, Response } from "express";
import { Client } from "pg";
const connectionString =
  "postgres://ycdrsdkz:VCNlVKZ--PJLCHozzG9gQVrKhU_OEJdj@stampy.db.elephantsql.com:5432/ycdrsdkz";

export class TodoController {
  public addNewTodo(req: Request, res: Response) {
    const results = [];
    const { todoTitle, todoDescription } = req.body;
    const data = {
      todoTitle,
      todoDescription,
      complete: false
    };
    const client: any = new Client(connectionString);
    client.connect(error => {
      if (error) {
        return res.status(500).json({ success: false, error: error });
      }
      client
        .query(
          "INSERT INTO todoList(todoTitle, todoDescription, complete) values($1, $2, $3)",
          [data.todoTitle, data.todoDescription, data.complete]
        )
        .then(result1 => {
          return res.send({success: true, msg: 'Todo Added Successfully'});
        })
        .catch(err => {
          return res.json({ success: false, data: err });
        });
    });
  }

  public getTodos(req: Request, res: Response) {
    const results = [];
    const client = new Client(connectionString);
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

      })
  }

  public getTodoWithID(req: Request, res: Response) {
    const id = req.params.id;
    var client = new Client(connectionString);
    client.connect((error) => {

      if (error) {
        return res.status(500).json({ success: false, error: error });
      }

      client.query('SELECT * FROM todoList where id=($1)', [id]).then((result) => {
      return res.status(200).json(result.rows);  
      }).catch((err) => {
      return res.status(500).json({ success: false, data: err });  
      })
    });
  }

  public updateTodo(req: Request, res: Response) {
    const results = [];
    const id = req.params.id;
    const { todoTitle, todoDescription, complete } = req.body;
    const data = {
      todoTitle,
      todoDescription,
      complete
    };
    console.log(data);
    const client = new Client(connectionString);
    client.connect(() => {
      client.query(
        "UPDATE todoList SET todoTitle=($1), todoDescription=($2), complete=($3) where id=($4)",
        [data.todoTitle, data.todoDescription, data.complete, id]
      ).then(err => {
        return res.status(200).json({ success: true, msg: "UPDATED!" });
      }).catch(err => {
        return res.status(500).json({ success: false, data: err });
      });
    })
  }

  public deleteTodo(req: Request, res: Response) {
    const results = [];
    const id = req.params.id;
    var client = new Client(connectionString);
    client.connect(() => {
        client.query("DELETE FROM todoList WHERE id=($1)", [id])
        .then(err => {
          return res.status(200).json({ success: true, msg: "DELETED!" });
        })
        .catch(err => {
          return res.status(500).json({ success: false, data: err });
        });
      })
  }
}