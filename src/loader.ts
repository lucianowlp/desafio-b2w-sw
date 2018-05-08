import * as http from 'http';
import serverExpress from './config/server';
import { environment } from './common/environment';

const server = http.createServer(serverExpress);


server.listen(environment.server.port);
server.on('listening', () => console.log(`API is running on port ${environment.server.port}.`));