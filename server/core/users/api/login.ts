import { Request, Response } from 'express';
import { IOmniUsers, omniUsers, ELoginErrors } from '../models/Users';

/**
 * Given an User ID and Passwords, logs him into the system if they match
 * @params {string} id
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await omniUsers.findByCredentials(username, password);

    if (user) {
      const token = await omniUsers.generateAuthToken(user);
      res.header('x-auth', token).json({ token });
    }
  } catch (err) {
    switch (err) {
      case ELoginErrors.NoUser: return res.status(401).json({ message: ELoginErrors.NoUser });
      case ELoginErrors.InactiveUser: return res.status(401).json({ message: ELoginErrors.InactiveUser });
      case ELoginErrors.NoPassword: return res.status(401).json({ message: ELoginErrors.NoPassword });
      case ELoginErrors.IncorrectPassword: return res.status(401).json({ message: ELoginErrors.IncorrectPassword });
      default:
        res.status(500).json(err);
    }

  }
};
