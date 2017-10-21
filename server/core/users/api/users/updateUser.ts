import { Request, Response } from 'express';

/**
 * Given an User ID, and an update object, updates the User info
 * @params {string} id
 * @body {object} information to be updated
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
