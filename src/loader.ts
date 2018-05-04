import * as http from 'http';
import server from './config/server';

const port = 5005;

const serverr = http.createServer(server);

serverr.listen(port);
serverr.on('listening', () => console.log(`API is running on port ${port}.`));