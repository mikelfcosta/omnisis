import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import Router from './Router';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    (<any>mongoose).Promise = Promise;
    mongoose.connect('mongodb://localhost:27017/iot', { useMongoClient: true });
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json({ limit: '5mb' }));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(express.static(`${process.cwd()}/public/`));
    this.express.use(cors());
  }

  private routes() : void {
    this.express.use('/', Router.omni);
  }
}

export default new App().express;
