import { Request, Response } from 'express';
import * as moment from 'moment';
import omniSmartCardsLogs from '../../iot/models/omniSmartCardsLogs';

/**
 * Given a Card ID, check if the card exists, is assigned and validated.
 * @params {string} _id: Card ID
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  try {
    const data = [];
    for (let i = 0; i <= 60; i += 1) {
      const day = moment().subtract(i, 'd');
      const query = { timestamp: { $gte: day.startOf('d').toDate(), $lte: day.endOf('d').toDate() } };
      const access = await omniSmartCardsLogs.count(query);
      data.push({ access, name: day.format('DD/MM') });
    }
    res.json(data.reverse());

  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
