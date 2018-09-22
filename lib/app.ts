import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/todoRoutes";
//importing all routes of todo app
import { Client } from "pg";
//importing Client from postgresql (elephantsql: postgresql as a service)
//Heroku
class App {
  // declaring and initializing
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public postUrl: string =
    "postgres://jjczkcpp:vCol1kmHUXJo8ID7gzHbqzcJS5AGidFR@pellefant.db.elephantsql.com:5432/jjczkcpp";
  // URL for connecting in elephantsql

  // declare the express constructor into app and also called config methods
  constructor() {
    this.app = express();
    this.configDatabaseSetup();
    this.configSetup();
    // pass the app into routes file
    this.routePrv.routes(this.app);
  }
  // creating a private method with no return type
  private configDatabaseSetup(): void {
    var client = new Client(this.postUrl);
    // creating the client object or instance and pass the database Url
    client.connect(function(err) {
      // call the method to verify the connection of postgresql
      if (err) {
        // if error occurs then return the error on console
        return console.error("could not connect to postgres", err);
      }
      // connection established
      client.query(
        "SELECT NOW()",
        function(err, result) {
          // if error occurs on query then return error on console
          if (err) {
            return console.error("error running query", err);
          }

          // if query succeded then return the current time on console
          // console.log("Connected to PostGreSQL at ", result.rows[0].theTime);
          console.log("Postgresql server started");
          // >> output: 2018-08-23T14:02:57.117Z

          // closing the connection when it is not in used
          client.end();
        }
      );
    });
  }

  private configSetup(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());

    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
    });
  }
}

// creating the App class instance and export it into server.ts
export default new App().app;
