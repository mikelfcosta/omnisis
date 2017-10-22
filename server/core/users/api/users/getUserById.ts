import { Request, Response } from 'express';
import { omniUsers } from '../../models/Users';

/**
 * Given an User ID, retrieves information about that User.
 * @params {string} _id
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const user = await omniUsers.findById(_id, 'roles active createdAt createdBy lastLogin profile').lean();
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
