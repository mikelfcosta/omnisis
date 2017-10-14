import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import Router from './Router';

class App {
  public express: express.Application;
  public compiler: webpack.Compiler;

  constructor() {
    this.express = express();
    mongoose.connect('mongodb://localhost:27017/iot', { useMongoClient: true });
    this.middleware();
    if (process.env.NODE_ENV === 'development') this.activateWebpack();
    this.routes();
  }

  private middleware(): void {
    this.express.use(bodyParser.json({ limit: '5mb' }));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(express.static(`${process.cwd()}/public/`));

  }

  private activateWebpack() : void {
    this.compiler = webpack(webpackConfig);
    this.express.use(webpackDevMiddleware(this.compiler, { publicPath: '/' }));
    this.express.use(webpackHotMiddleware(this.compiler));
  }

  private routes() : void {
    this.express.use('/', Router.iot);
  }
}

export default new App().express;
