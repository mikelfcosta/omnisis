import { Request, Response } from 'express';
import * as moment from 'moment';
import omniLocations from '../models/omniLocations';
import omniMachines from '../models/omniMachines';
import { IOmniCampi } from '../models/omniCampi';

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
      const $regex = new RegExp(search);
      query['name'] = { $regex, $options: 'i' };
    }

    const rawLocations = await omniLocations
      .find(query, 'campus name machines createdBy lastUpdatedAt')
      .sort(order)
      .skip(+page * +limit)
      .limit(+limit)
      .populate('campus');

    const total = await omniLocations.count(query);

    return Promise.all(rawLocations.map(async (location) => {
      const machinesOnLocation = await omniMachines.count({ location: location._id });
      return {
        _id: location._id,
        campus: (<IOmniCampi>location.campus).name,
        name: location.name,
        machines: machinesOnLocation,
        createdBy: location.createdBy,
        updatedAt: moment(location.lastUpdatedAt).format('DD/MM/YYYY'),
      };
    }))
      .then(locations => res.json({ locations, total }));

  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
