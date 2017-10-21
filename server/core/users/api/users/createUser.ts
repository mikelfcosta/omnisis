import { Request, Response } from 'express';
import { omniUsers } from '../../models/Users';

/**
 * Creates a new User
 * @params {string} id
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  try {
    const user = new omniUsers({
      _id: req.body.username,
      password: req.body.password,
      createdBy: 'TEST.USER',
    });
    const createdUser = await user.save();
    return res.json({
      message: 'Usuário criado com sucesso',
      payload: { user: createdUser._id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
