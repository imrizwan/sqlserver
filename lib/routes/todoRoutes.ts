// /lib/routes/crmRoutes.ts

// import { Request, Response } from "express";
import { TodoController } from '../controllers/todoController';

export class Routes {
    public todoController: TodoController = new TodoController();
    public routes(app): void {

        // Contact 
        app.route('/todo/api/v1.0/tasks')
            // GET endpoint 
            .get(this.todoController.getTodos)
            // POST endpoint
            .post(this.todoController.addNewTodo)

        // Contact detail
        app.route('/todo/api/v1.0/tasks/:id')
            // get specific contact
            .get(this.todoController.getTodoWithID)
            .put(this.todoController.updateTodo)
            .delete(this.todoController.deleteTodo)
    }
}
