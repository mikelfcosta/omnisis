import { Request, Response } from 'express';
import * as moment from 'moment';
import omniHolders from '../../holders/models/omniHolders';
import omniSmartCardsLogs, { IOmniSmartCardsLogs } from '../../iot/models/omniSmartCardsLogs';
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
    const daily: any = { summary: {}, data: [] };
    const monthly: any = { summary: {}, data: [] };
    const semester: any = { summary: {}, data: [] };

    // Set Daily
    for (let i = 0; i <= 31; i += 1) {
      const day = moment().subtract(i, 'd');
      const registered = await omniHolders.count({ lastUpdatedAt: { $lte: day.toDate() } });
      const active = await omniHolders.count({ lastUpdatedAt: { $lte: moment(day).subtract(14, 'd').toDate() } });
      daily.data.push({ Registrados: registered, Ativos: active, name: day.format('DD/MM') });
    }
    daily.summary['students'] = await omniHolders.count({ lastUpdatedAt: { $gte: moment().subtract(31, 'd').toDate() } });
    daily.summary['activeStudents'] = await omniHolders.count({ lastUpdatedAt: { $lte: moment().subtract(14, 'd').toDate() } });
    daily.summary['time'] = '2h 12m';
    daily.data.reverse();

    // Set Monthly
    for (let i = 0; i <= 4; i += 1) {
      const month = moment().subtract(i, 'M').startOf('M');
      const registered = await omniHolders.count({ lastUpdatedAt: { $lte: month.toDate() } });
      const active = await omniHolders.count({ lastUpdatedAt: { $lte: moment(month).subtract(14, 'd').toDate() } });
      monthly.data.push({ Registrados: registered, Ativos: active, name: month.format('MM/YYYY') });
    }
    monthly.summary['students'] = await omniHolders.count({ lastUpdatedAt: { $gte: moment().subtract(4, 'M').startOf('M').toDate() } });
    monthly.summary['activeStudents'] = await omniHolders.count({ lastUpdatedAt: { $lte: moment().subtract(4, 'M').startOf('M').subtract('14', 'd').toDate() } });
    monthly.summary['time'] = '1h 55m';
    monthly.data.reverse();

    // Set Semester
    const firstSemester = moment('2017-06-01');
    const secondSemester = moment('2017-12-01');

    const firstSemesterRegistered = await omniHolders.count({ lastUpdatedAt: { $lte: firstSemester.toDate() } });
    const secondSemesterRegistered = await omniHolders.count({ lastUpdatedAt: { $lte: secondSemester.toDate() } });
    const firstSemesterActive = await omniHolders.count({ lastUpdatedAt: { $lte: moment(firstSemester).subtract(14, 'd').toDate() } });
    const secondSemesterActive = await omniHolders.count({ lastUpdatedAt: { $lte: moment(secondSemester).subtract(14, 'd').toDate() } });
    semester.data.push({ Registrados: firstSemesterRegistered, Ativos: firstSemesterActive, name: firstSemester.format('MM/YYYY') });
    semester.data.push({ Registrados: secondSemesterRegistered, Ativos: secondSemesterActive, name: secondSemester.format('MM/YYYY') });
    semester.summary['students'] = await omniHolders.count({ lastUpdatedAt: { $gte: moment(firstSemester).toDate() } });
    semester.summary['activeStudents'] = await omniHolders.count({ lastUpdatedAt: { $lte: moment(secondSemester).subtract('14', 'd').toDate() } });
    semester.summary['time'] = '1h 30m';

    res.json({ daily, monthly, semester });

  } catch (err) {
    console.error(err);
    if (err) return res.status(500).json(err);
  }
};
