import * as express from 'express';
import * as request from 'request';
import database from './db';
import controller from './controller';

class App{

    public app: express.Application;
    private database: database;
    private controller: controller;

    
    constructor(){
        this.app = express();
        this.routes();
        this.database = new database();
        this.database.createConnection();
        this.controller = new controller();
    }


    routes(){
        this.app.route('/').get((req, res) => res.status(200).json({"result" : "conectado"}));
        this.app.route('/api/refresh').get(this.getEndPoint.bind(this));
        this.app.route('/api/dados').get((req, res) => this.controller.select(req, res));
    }

    getEndPoint(req, res){      
        request('https://crush-management.herokuapp.com/api/crushs', (error, response, data) => this.controller.create(data, res));
    }

}
export default new App();