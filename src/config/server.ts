import * as express from 'express';
import * as mongoose from 'mongoose';

import { environment } from '../common/environment';

class Server {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.initializeDB();
    }

    initializeDB() {
        return mongoose.connect(environment.db.url);
    }
}

export default new Server().express;