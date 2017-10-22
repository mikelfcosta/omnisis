import { Request, Response } from 'express';
import { omniUsers } from '../../models/Users';

/**
 * Gets all created Users
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  const { skip, limit, sort } = req.query;
  try {
    const users = await omniUsers.find({}).sort(sort).skip(skip).limit(limit);
    const total = await omniUsers.count({});
    res.json({ users, total });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
