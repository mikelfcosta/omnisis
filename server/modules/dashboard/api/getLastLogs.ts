import { Request, Response } from 'express';
import omniSmartCardsLogs from '../../iot/models/omniSmartCardsLogs';
import { IOmniLocations } from '../../locations/models/omniLocations';
import * as moment from 'moment';

/**
 * Given a Card ID, check if the card exists, is assigned and validated.
 * @params {string} _id: Card ID
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export default async (req: Request, res: Response) => {
  try {
    const lastLogs = await omniSmartCardsLogs.find({})
      .sort('-timestamp')
      .skip(0)
      .limit(10)
      .populate('machineLocation');
    // { _id: '9', holderId: '20354583', location: 'Pualista', dateTime: '11/11/2017 12:01' },

    const logs = lastLogs.map((log) => {
      return {
        _id: log._id,
        holderId: log.holderId,
        type: log.accessType === 'in' ? 'Entrada' : 'Saída',
        location: (<IOmniLocations>log.machineLocation).name,
        dateTime: moment(log.timestamp).format('DD/MM/YYYY HH:mm'),
      };
    });
    res.json(logs);
  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
