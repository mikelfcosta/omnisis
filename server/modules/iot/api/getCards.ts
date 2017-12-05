import { Request, Response } from 'express';
import moment = require('moment');
import omniSmartCards from '../models/omniSmartCards';

/**
 * Given a Card ID, check if the card exists, is assigned and validated.
 * @params {string} _id: Card ID
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  const { page, limit, order, search } = req.query;
  try {
    const query: any = {};

    if (search) {
      query['_id'] = { $regex: new RegExp(search), $options: 'i' };
    }

    const rawCards = await omniSmartCards
      .find(query, 'active student lastAssignedBy lastUpdatedAt')
      .sort(order)
      .skip(+page * +limit)
      .limit(+limit)
      .populate({
        path: 'location',
        model: 'OmniLocations',
        populate: {
          path: 'campus',
          model: 'OmniCampi',
        },
      });

    const total = await omniSmartCards.count(query);

    /*
      _id: string;
      status: string;
      user: string | null;
      createdBy: string;
      updatedAt: string | null;
     */

    const cards = rawCards.map((card) => {
      return {
        _id: card._id,
        status: card.active ? 'Ativo' : 'Inativo',
        user: card.student,
        lastAssignedBy: card.lastAssignedBy,
        lastAssignedAt: moment(card.lastAssignedAt).format('DD/MM/YYYY'),
      };
    });

    res.json({ cards, total });
  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
