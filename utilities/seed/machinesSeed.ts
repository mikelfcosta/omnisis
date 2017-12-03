import { random } from 'lodash';
import { models } from '../seed';

export default async function machinesSeed(quantity = 47) {
  const users = ['michel.costa', 'joao.vitor'];
  const machinesToSave = [];

  try {
    await models.omniMachines.remove({});

    const locations = await models.omniLocations.find({});
    for (let i = 0; i < quantity; i += 1) {
      const user = users[random(0, 1)];
      const newMachine = new models.omniMachines({
        location: locations[random(0, locations.length - 1)]._id,
        createdBy: user,
        lastUpdatedBy: user,
      });
      machinesToSave.push(await newMachine.save());
    }
    return Promise.all(machinesToSave);
  } catch (err) {
    console.error(err);
  }
}
