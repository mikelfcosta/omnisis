import { Request, Response } from 'express';
import * as moment from 'moment';
import omniSmartCardsLogs from '../../iot/models/omniSmartCardsLogs';
import * as fs from 'fs';
import { random } from 'lodash';

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
    return fs.readFile(`${__dirname}/data/getAccessByCampus.${day}.json`, 'utf8', async (err, data) => {
      if (err) console.error(err);
      if (data) return res.json(JSON.parse(data));
      const newData: any[] = [];
      for (let i = 0; i <= 60; i += 1) {
        const day = moment().subtract(i, 'd');
        const query = { timestamp: { $gte: day.startOf('d').toDate(), $lte: day.endOf('d').toDate() } };
        const access = await omniSmartCardsLogs.count(query);
        newData.push({
          Mooca: Math.floor((access / 100) * random(0, 30)),
          'Paulista II': Math.floor((access / 100) * random(0, 15)),
          Morumbi: Math.floor((access / 100) * random(0, 30)),
          'Vila Olimpia': Math.floor((access / 100) * random(0, 40)),
          name: day.format('DD/MM'),
        });
      }
      newData.reverse();
      return fs.writeFile(`${__dirname}/data/getAccessByCampus.${day}.json`, JSON.stringify(newData), 'utf8', (err) => {
        if (err) console.error(err);
        res.json(newData);
      });
    });


  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
