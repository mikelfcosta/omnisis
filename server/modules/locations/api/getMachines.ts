import { Request, Response } from 'express';
import omniMachines from '../models/omniMachines';
import { IOmniLocations, default as omniLocations } from '../models/omniLocations';
import moment = require('moment');
import omniCampi, { IOmniCampi } from '../models/omniCampi';

const locations = omniLocations;
const campus = omniCampi;

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

    const rawMachines = await omniMachines
      .find(query, 'status location createdBy lastUpdatedAt')
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

    const total = await omniMachines.count(query);

    const machines = rawMachines.map((machine) => {
      return {
        _id: machine._id,
        status: machine.status ? 'Ativo' : 'Inativo',
        campus: (<IOmniLocations>machine.location).campus ? (<IOmniCampi>(<IOmniLocations>machine.location).campus).name : null,
        location: machine.location ? (<IOmniLocations>machine.location).name : null,
        createdBy: machine.createdBy,
        updatedAt: moment(machine.lastUpdatedAt).format('DD/MM/YYYY'),
      };
    });

    res.json({ machines, total });
  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
