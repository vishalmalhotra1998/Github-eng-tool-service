import { configuration } from './config';
import Server from './Server';
const server = new Server(configuration);
server.bootStrap();
server.run();
