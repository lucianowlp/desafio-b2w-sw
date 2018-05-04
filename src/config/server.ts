import * as express from 'express';

class Server {
    public express: express.Application;

    constructor() {
        this.express = express();
    }
}

export default new Server().express;