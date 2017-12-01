import { Request, Response } from 'express';
import { ECardErrors, omniSmartCards } from '../models/Cards';
import { PRIVATE_KEY } from '../index';

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
    const card = await omniSmartCards.findById(_id);
    if (card) return res.json({ line1: 'OPS! CARTAO ', line2: 'JA CADASTRADO ' });

    const newCard = new omniSmartCards({
      _id,
      assigned: false,
      student: null,
      active: true,
    });
    await newCard.save();
    res.json({ line1: 'CADASTRADO ', line2: 'COM SUCESSO ' });
  } catch (err) {
    if (err) return res.status(500).json({ line1: 'OCORREU UM ERRO ', line2: 'NO CADASTRO... ' });
  }
};
