import { Request, Response } from 'express';
import * as moment from 'moment';
import omniSmartCardsLogs from '../../iot/models/omniSmartCardsLogs';
import * as fs from 'fs';
import { random } from 'lodash';
import omniMachines from '../../locations/models/omniMachines';

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
    return fs.readFile(`${__dirname}/data/getAccessByMachines.${day}.json`, 'utf8', async (err, data) => {
      if (err) console.error(err);
      if (data) return res.json(JSON.parse(data));
      const newData: any[] = [];
      const machines = await omniMachines.find({}, '_id');
      return Promise.all(machines.map(async (machine) => {
        const machineCount = await omniSmartCardsLogs.count({ machineId: machine._id });
        return newData.push({ name: machine._id.toHexString(), Acessos: machineCount });
      }))
        .then(() => {
          return fs.writeFile(`${__dirname}/data/getAccessByMachines.${day}.json`, JSON.stringify(newData), 'utf8', (err) => {
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
