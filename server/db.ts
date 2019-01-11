import * as mongoose from 'mongoose';

class DataBase {

    private dbUrl = 'mongodb://127.0.00.1/madrugadao2';
    private dbConnection;

    constructor() { }

    createConnection() {
        mongoose.connect(this.dbUrl);
        this.logger();
    }

    closeConnection() {
        this.dbConnection.close();
        this.logger();
    }

    logger() {
        this.dbConnection = mongoose.connection;
        this.dbConnection.on('connected', () => console.log('Mongoose está conectado!'));
        this.dbConnection.on('error', error => console.error.bind(console, "Erro na conexão: " + error));
        this.dbConnection.on('disconnected', () => console.log("Mongoose está desconectado"));
    }

}

export default DataBase;