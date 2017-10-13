import { Router, Request, Response } from 'express';
import core from './core';
import modules from './modules';

export class IotRouter {
  iot: Router = Router();
  core: Router = core;
  modules: Router = modules;

  constructor() {
    this.init();
  }

  init() {
    this.iot.use('/api/br/v1/core', this.core);
    this.iot.use('/api/br/v1/modules', this.modules);
    this.iot.get('*', (req: Request, res: Response) => {
      res.sendFile(`${process.cwd()}/public/index.html`);
    });
  }
}

const router = new IotRouter();
router.init();

export default router;
