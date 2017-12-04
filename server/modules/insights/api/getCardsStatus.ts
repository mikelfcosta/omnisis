import { Request, Response } from 'express';
import * as moment from 'moment';
import * as fs from 'fs';
import omniSmartCards from '../../iot/models/omniSmartCards';

/**
 * Given a Card ID, check if the card exists, is assigned and validated.
 * @params {string} _id: Card ID
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  try {
    const day = moment().subtract(1, 'd').format('DD.MM.YYYY');
    return fs.readFile(`${__dirname}/data/getCardsStatus.${day}.json`, 'utf8', async (err, data) => {
      if (err) console.error(err);
      if (data) return res.json(JSON.parse(data));
      const newData: any[] = [];
      newData.push({ name: 'Ativos', Quantidade: await omniSmartCards.count({ active: true, assigned: true }) });
      newData.push({ name: 'Inativos', Quantidade: await omniSmartCards.count({ active: false }) });
      newData.push({ name: 'Vazios', Quantidade: await omniSmartCards.count({ assigned: false }) });
      return fs.writeFile(`${__dirname}/data/getCardsStatus.${day}.json`, JSON.stringify(newData), 'utf8', (err) => {
        if (err) console.error(err);
        res.json(newData);
      });
    });


  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
