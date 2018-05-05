import * as express from 'express';
import * as mongoose from 'mongoose';

import { environment } from '../common/environment';

class Server {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.initializeDb().then(() =>
            console.log('conectado com sucesso')
        ).catch(err => {
            console.log('Erro ao conectar com o mongodb')
            console.error(err)
            process.exit(1);
        });
    }

    initializeDb(): mongoose.MongooseThenable {
        return mongoose.connect(environment.db.url);
    }
}

export default new Server().express;