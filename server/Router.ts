import { Router, Request, Response } from 'express';
import core from './core';
import modules from './modules';

export class OmniRouter {
  static api: string = '/api/br/v1';
  static coreApi = `${OmniRouter.api}/core`;
  static modulesApi = `${OmniRouter.api}/modules`;
  omni: Router = Router();
  core: Router = core;
  modules: Router = modules;

  constructor() {
    this.init();
  }

  init() {
    this.omni.use(OmniRouter.coreApi, this.core);
    this.omni.use(OmniRouter.modulesApi, this.modules);
    if (process.env.NODE_ENV === 'production') {
      this.omni.get('*', (req: Request, res: Response) => {
        res.sendFile(`${process.cwd()}/public/index.html`);
      });
    }
  }
}

const router = new OmniRouter();
router.init();

export default router;
