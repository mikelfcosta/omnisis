import { Request, Response } from 'express';
import * as moment from 'moment';
import omniSmartCardsLogs from '../../iot/models/omniSmartCardsLogs';
import * as fs from 'fs';
import omniHolders from '../../holders/models/omniHolders';
import omniCampi from '../../locations/models/omniCampi';

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
    return fs.readFile(`${__dirname}/data/getActivesByCampus.${day}.json`, 'utf8', async (err, data) => {
      if (err) console.error(err);
      if (data) return res.json(JSON.parse(data));
      const newData: any[] = [];
      const campi = await omniCampi.find({}, 'name');
      return Promise.all(campi.map(async (campus) => {
        const activeHolders = await omniHolders.count({ 'student.mainCampus': campus._id });
        newData.push({ name: campus.name, Ativos: activeHolders });
      }))
        .then(() => {
          return fs.writeFile(`${__dirname}/data/getActivesByCampus.${day}.json`, JSON.stringify(newData), 'utf8', (err) => {
            if (err) console.error(err);
            res.json(newData);
          });
        });

    });


  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
