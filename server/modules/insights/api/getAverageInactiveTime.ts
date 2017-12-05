import { Request, Response } from 'express';
import * as moment from 'moment';
import * as fs from 'fs';

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
    return fs.readFile(`${__dirname}/data/getAverageInactiveTime.${day}.json`, 'utf8', async (err, data) => {
      if (err) console.error(err);
      if (data) return res.json(JSON.parse(data));
      let newData: any = {};
      for (let i = 0; i <= 60; i += 1) {
        const day = moment().subtract(i, 'd');
        // const query = { timestamp: { $gte: day.startOf('d').toDate(), $lte: day.endOf('d').toDate() } };
        newData = [
          { name: '7-15d', value: 0 },
          { name: '16d-30d', value: 1060 },
          { name: '1m-2m', value: 30512 },
          { name: '3m+', value: 8450 },
        ];
      }
      return fs.writeFile(`${__dirname}/data/getAverageInactiveTime.${day}.json`, JSON.stringify(newData), 'utf8', (err) => {
        if (err) console.error(err);
        res.json(newData);
      });
    });


  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
