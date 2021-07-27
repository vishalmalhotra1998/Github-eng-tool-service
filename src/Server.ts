import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { rootRouting } from './routes';
import { DataBase } from './libs/Database';
import { notFoundRoute } from './libs/notFoundRoute';
import { errorHandler } from './libs/errorHandler';

class Server {
  private app: express.Express;
  private dataBase: DataBase;
  constructor(private config: any) {
    this.app = express();
    this.dataBase = new DataBase();
  }
  bootStrap = (): void => {
    this.initBodyParse();
    this.setUpRootRoutes();
  }
  initBodyParse = () => {
    const { app } = this;
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }
  run = (): void => {
    const { app, config: { PORT: port, MONGO_URL: mongoUrl }, dataBase } = this;
    dataBase.open(mongoUrl).then(() => {
      app.listen(port, () => {
        console.log(':::::::::::Runnig Port::::::::', port);
      });
    });
  }
  setUpRootRoutes = (): void => {
    const { app } = this;
    app.get('/health-check', (request: Request, response: Response) => {
      response.send('I am Robot');
    });
    // app.use('/api', rootRouting);
    // app.use(notFoundRoute);
    // app.use(errorHandler);
  }
}
export default Server;
