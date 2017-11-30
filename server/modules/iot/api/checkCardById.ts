import { Request, Response } from 'express';
import { ECardErrors, omniSmartCards } from '../models/Cards';

import { PRIVATE_KEY } from '../index';
import normalizeName from '../common/normalizeName';

/**
 * Given a Card ID, check if the card exists, is assigned and validated.
 * @params {string} _id: Card ID
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  const { _id } = req.params;
  if (!_id) return res.status(400).json({ line1: 'ERRO: SEM ID    ', access: '0' });

  const { private_key } = req.query;
  if (!private_key || private_key !== PRIVATE_KEY) return res.status(400).json({ line1: 'ERRO: CHAVE INVA', access: '0' });

  try {
    const user = await omniSmartCards.checkStudent(_id);

    if (!user) res.json({ line1: 'CARTAO INVALIDO ', access: '0' });

    const studentName = normalizeName(user.student);

    const response = { line1: studentName, access: user.active ? '1' : '0' };

    res.json(response);
  } catch (err) {
    if (err === ECardErrors.NoCardFound) return res.status(400).json({ line1: ECardErrors.NoCardFound, access: '0' });
    console.log(err);
    res.status(500).json({ err });
  }
};
