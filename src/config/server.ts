import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as allowCors from './cors';
import planetRouter from '../services/planetService';
import * as bodyParser from 'body-parser';
import { environment } from '../common/environment';

class Server {
    public app: express.Application;
    public router: express.Router;

    constructor() {
        this.app = express();
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
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cors(allowCors));
        this.routes();
    }

    initializeDb(): mongoose.MongooseThenable {
        return mongoose.connect(environment.db.url);
    }

    private routes(): void {
        const router: express.Router = express.Router();

        this.app.use('/', router);
        this.app.use('/api/v1/planets/', planetRouter);
    }
}

export default new Server().app;