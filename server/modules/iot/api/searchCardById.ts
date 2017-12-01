import { Request, Response } from 'express';
import { ECardErrors, omniSmartCards } from '../models/Cards';
import { PRIVATE_KEY } from '../index';
import normalizeLength from '../common/normalizeLength';

/**
 * Given a Card ID, check if the card exists, then if is assigned, then returns the card ID if it is not.
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
    const card = await omniSmartCards.findById(_id);

    if (!card) return res.json({ line1: 'OPS! ESTE CARTAO', line2: 'E INVALIDO...   ' });
    else if (card.assigned) return res.json({ line1: 'OPS! ESTE CARTAO', line2: 'ESTA EM USO...  ' });
    else return res.json({ line1: 'CODIGO:         ', line2: normalizeLength(card._id) });
  } catch (err) {
    if (err === ECardErrors.NoCardFound) return res.status(400).json({ message: ECardErrors.NoCardFound });
    res.status(500).json({ err });
  }
};
