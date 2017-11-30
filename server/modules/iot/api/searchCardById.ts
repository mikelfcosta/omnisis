import { Request, Response } from 'express';
import { ECardErrors, omniSmartCards } from '../models/Cards';

/**
 * Given a Card ID, check if the card exists, is assigned and validated.
 * @params {string} _id: Card ID
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  const { _id } = req.params;
  try {
    const user = await omniSmartCards.checkStudent(_id);
    res.json(user);
  } catch (err) {
    if (err === ECardErrors.NoCardFound) return res.status(400).json({ message: ECardErrors.NoCardFound });
    res.status(500).json({ err });
  }
};
