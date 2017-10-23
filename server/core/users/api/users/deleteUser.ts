import { Request, Response } from 'express';
import { IOmniUsers, IOmniUsersModel, omniUsers } from '../../models/Users';

/**
 * Given an ID, disables an User
 * @params {string} id
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const disabledUser = <IOmniUsers>await omniUsers.findByIdAndUpdate(_id, { active: false }, { new: true }).lean();
    if (!disabledUser) return res.status(400).json({ message: 'Usuário não encontrado' });
    res.json({
      message: 'Usuário desabilitado com sucesso',
      payload: { user: disabledUser._id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
