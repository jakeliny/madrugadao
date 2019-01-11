import * as express from 'express';
import * as request from 'request';
import * as bodyParser from 'body-parser';

import database from './db';
import controller from './controller';

class App {

    public app: express.Application;
    private database: database;
    private controller: controller;


    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
        this.database = new database();
        this.database.createConnection();
        this.controller = new controller();
    }

    middleware(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
      }


    routes() {
        this.app.route('/').get((req, res) => res.status(200).json({ "result": "conectado" }));
        this.app.route('/api/refresh').get(this.getEndPoint.bind(this));
        this.app.route('/api/dados').get((req, res) => this.controller.select(req, res));

        this.app.route('/api/dados/:id').get((req, res) => this.controller.selectOne(req, res));
        this.app.route('/api/dados/:id').delete((req, res) => this.controller.deleteOne(req, res));
        this.app.route('/api/dados/:id').put((req, res) => this.controller.update(req, res));
    }

    getEndPoint(req, res) {
        request('https://crush-management.herokuapp.com/api/crushs', (error, response, data) => this.controller.create(data, res));
    }

}
export default new App();