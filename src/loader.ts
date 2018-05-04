import * as http from 'http';
import server from './config/server';
import { environment } from './common/environment';

const serverr = http.createServer(server);

serverr.listen(environment.server.port);
serverr.on('listening', () => console.log(`API is running on port ${environment.server.port}.`));