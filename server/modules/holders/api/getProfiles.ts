import { Request, Response } from 'express';
import * as moment from 'moment';
import omniHoldersProfiles from '../models/omniHoldersProfiles';
import omniHolders from '../models/omniHolders';

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

    const rawProfiles = await omniHoldersProfiles
      .find(query, 'name createdBy lastUpdatedAt')
      .sort(order)
      .skip(+page * +limit)
      .limit(+limit);

    const total = await omniHoldersProfiles.count(query);

    return Promise.all(rawProfiles.map(async (profile, index) => {
      const usersOnProfile = await omniHolders.count({ profiles: profile._id });
      return {
        name: profile.name,
        users: usersOnProfile,
        createdBy: profile.createdBy,
        updatedAt: moment(profile.lastUpdatedAt).format('DD/MM/YYYY'),
      };
    }))
      .then(profiles => res.json({ profiles, total }));

  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
