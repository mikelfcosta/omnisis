import { Request, Response, NextFunction } from 'express';

export default function parseQuery(required: boolean = false) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const hasQuerys = (req.query.page !== undefined && req.query.limit !== undefined && req.query.sort !== undefined);
    if (!hasQuerys && !required) {
      next();
    } else if (!hasQuerys && required) {
      return res.status(400).json({ message: 'Dados de paginação incorretos' });
    } else if (hasQuerys) {
      req.query.limit = parseInt(req.query.limit, 10);
      req.query.skip = (parseInt(req.query.page, 10) - 1) * req.query.limit;
      if (req.query.skip < 0) return res.status(400).json({ message: 'Dados de paginação incorretos' });
      delete req.query.page;
      next();
    }
  };
}