import { Request, Response } from 'express';
import { omniUsers } from '../../models/Users';

/**
 * Given an User ID, and an update object, updates the User info
 * @params {string} id
 * @body {object} information to be updated
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  const { _id } = req.params;
  const update = req.body;
  try {
    const options = { new: true, select: 'roles active createdAt createdBy lastLogin profile' };
    const user = await omniUsers.findByIdAndUpdate(_id, update, options).lean();
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
