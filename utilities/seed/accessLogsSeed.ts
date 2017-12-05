import { models } from '../seed';
import { random } from 'lodash';
import * as moment from 'moment';

export default async function accessLogsSeed() {
  console.info('Starting Access Logs Seed');
  try {
    await models.omniSmartCardsLogs.remove({});
    const machines = await models.omniMachines.find({});
    const holders = await models.omniHolders.find({ activeCard: { $ne: null } });

    const accessLogsToCreate = [];

    // Inactive Holders
    const inactiveHolderCount = random(3000, 5000);


    const startDay = moment('08.07.2017', 'MM.DD.YYYY');
    for (let i = 0; i < inactiveHolderCount; i += 1) {
      const endDay = moment('10.31.2017', 'MM.DD.YYYY');
      const maxDays = endDay.diff(startDay, 'days');

      const daysToPass = random(1, maxDays);
      for (let ind = 0; ind < daysToPass; ind += 1) {
        const date = moment(startDay).add(ind, 'd');
        const inHour = random(10, 20);
        const inTime = moment(`${moment(date).format('MM.DD.YYYY')} ${inHour}:${random(10, 59)}`, 'MM.DD.YYYY HH:mm');
        const outTime = inTime.add(random(1, 4), 'h').add(random(10, 30), 'm');

        // Create In Access
        const machine = machines[random(0, machines.length - 1)];
        const inAccess = new models.omniSmartCardsLogs({
          machineId: machine._id,
          machineLocation: machine.location,
          holderCard: holders[i].activeCard,
          holderId: holders[i]._id,
          holderGroup: holders[i].group,
          accessType: 'in',
          timestamp: inTime,
        });
        accessLogsToCreate.push(await inAccess.save());

        // Create Out Access
        const outAccess = new models.omniSmartCardsLogs({
          machineId: machine._id,
          machineLocation: machine.location,
          holderCard: holders[i].activeCard,
          holderId: holders[i]._id,
          holderGroup: holders[i].group,
          accessType: 'out',
          timestamp: outTime,
        });
        accessLogsToCreate.push(await outAccess.save());
      }
    }

    // Active Holders
    for (let i = inactiveHolderCount; i < holders.length - 1; i += 1) {
      const endDay = moment('11.02.2017', 'MM.DD.YYYY');
      const maxDays = endDay.diff(startDay, 'days');

      const daysToPass = random(maxDays - 14, maxDays);
      for (let ind = 0; ind < daysToPass; ind += 1) {
        const date = moment(startDay).add(ind, 'd');
        const inHour = random(10, 20);
        const inTime = moment(`${moment(date).format('MM.DD.YYYY')} ${inHour}:${random(10, 59)}`, 'MM.DD.YYYY HH:mm');
        const outTime = inTime.add(random(1, 4), 'h').add(random(10, 30), 'm');

        // Create In Access
        const machine = machines[random(0, machines.length - 1)];
        const inAccess = new models.omniSmartCardsLogs({
          machineId: machine._id,
          machineLocation: machine.location,
          holderCard: holders[i].activeCard,
          holderId: holders[i]._id,
          holderGroup: holders[i].group,
          accessType: 'in',
          timestamp: inTime,
        });
        accessLogsToCreate.push(await inAccess.save());

        // Create Out Access
        const outAccess = new models.omniSmartCardsLogs({
          machineId: machine._id,
          machineLocation: machine.location,
          holderCard: holders[i].activeCard,
          holderId: holders[i]._id,
          holderGroup: holders[i].group,
          accessType: 'out',
          timestamp: outTime,
        });
        accessLogsToCreate.push(await outAccess.save());
      }
    }

    console.log(accessLogsToCreate.length);
    return Promise.all(accessLogsToCreate);
  } catch (err) {
    return Promise.reject(err);
  }
}
