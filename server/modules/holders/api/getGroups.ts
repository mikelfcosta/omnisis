import { Request, Response } from 'express';
import omniHoldersGroups from '../models/omniHoldersGroups';
import omniHolders from '../models/omniHolders';
import * as moment from 'moment';


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

    /*
    name: string;
    users: number;
    createdBy: string;
    updatedAt: string;
   */

    const rawGroups = await omniHoldersGroups
      .find(query, 'name createdBy lastUpdatedAt')
      .sort(order)
      .skip(+page * +limit)
      .limit(+limit);

    const total = await omniHoldersGroups.count(query);

    const groups: any[] = [];
    return rawGroups.forEach(async (group, index) => {
      const usersOnGroup = await omniHolders.count({ group: group._id });
      groups[index] = {
        name: group.name,
        users: usersOnGroup,
        createdBy: group.createdBy,
        updatedAt: moment(group.lastUpdatedAt).format('DD/MM/YYYY'),
      };
      if (index + 1 === rawGroups.length) return res.json({ groups, total });
    });

  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
