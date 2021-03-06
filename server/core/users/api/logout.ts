import { Request, Response } from 'express';

/**
 * Given an User ID, logs him out of the system
 * @params {string} id
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  try {
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
