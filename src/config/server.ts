import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as allowCors from './cors';

import { environment } from '../common/environment';

class Server {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.init();
    }

    private init(): void {
        this.initializeDb().then(() =>
            this.middleware()
        ).catch(err => {
            console.log('Erro ao conectar com o mongodb')
            console.error(err)
            process.exit(1);
        });
    }

    private middleware(): void {
        this.express.use(cors(allowCors));
    }

    initializeDb(): mongoose.MongooseThenable {
        return mongoose.connect(environment.db.url);
    }
}

export default new Server().express;