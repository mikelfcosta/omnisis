import { Request, Response } from 'express';
import omniHolders, { IOmniHolders } from '../models/omniHolders';
import omniHoldersGroups, { IOmniHoldersGroups } from '../models/omniHoldersGroups';

const groups = omniHoldersGroups;

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
      query['$or'] = [
        { _id: { $regex, $options: 'i'  } },
        { name: { $regex, $options: 'i'  } },
      ];
    }

    const rawHolders = await omniHolders
      .find(query, 'name group student activeCard')
      .sort(order)
      .skip(+page * +limit)
      .limit(+limit)
      .populate('group student.mainCampus');

    const total = await omniHolders.count(query);

    const holders = rawHolders.map((holder) => {
      return {
        _id: holder._id,
        name: holder.name,
        group: holder.group ? (<IOmniHoldersGroups>holder.group).name : null,
        campus: holder.student.mainCampus ? holder.student.mainCampus : null,
        activeCard: holder.activeCard,
      };
    });

    res.json({ holders, total });
  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
