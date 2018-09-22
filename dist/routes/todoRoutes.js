"use strict";
// /lib/routes/crmRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
// import { Request, Response } from "express";
const todoController_1 = require("../controllers/todoController");
class Routes {
    constructor() {
        this.todoController = new todoController_1.TodoController();
    }
    routes(app) {
        // Contact 
        app.route('/todo/api/v1.0/tasks')
            // GET endpoint 
            .get(this.todoController.getTodos)
            // POST endpoint
            .post(this.todoController.addNewTodo);
        // Contact detail
        app.route('/todo/api/v1.0/tasks/:id')
            // get specific contact
            .get(this.todoController.getTodoWithID)
            .put(this.todoController.updateTodo)
            .delete(this.todoController.deleteTodo);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=todoRoutes.js.map