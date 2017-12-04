import { random } from 'lodash';
import { models } from '../seed';

export async function locationsSeed() {
  console.info('Starting Locations Seed');
  await models.omniLocations.remove({});
  const campi = await models.omniCampi.find({});
  const users = ['michel.costa', 'joao.vitor'];

  const locationsToSave = [];
  try {
    for (let i = 0; i < campi.length; i += 1) {
      const user = users[random(0, 1)];
      const mainLocation = new models.omniLocations({
        campus: campi[i]._id,
        name: 'Entrada Principal',
        createdBy: user,
        lastUpdatedBy: user,
      });
      const secondaryLocation = new models.omniLocations({
        campus: campi[i]._id,
        name: 'Entrada Secundária',
        createdBy: user,
        lastUpdatedBy: user,
      });
      locationsToSave.push(await mainLocation.save());
      locationsToSave.push(await secondaryLocation.save());

      if (campi[i].name === 'Morumbi') {
        const studioLocation = new models.omniLocations({
          campus: campi[i]._id,
          name: 'Estúdio',
          createdBy: user,
          lastUpdatedBy: user,
        });
        const bspLocation = new models.omniLocations({
          campus: campi[i]._id,
          name: 'BSP',
          createdBy: user,
          lastUpdatedBy: user,
        });
        locationsToSave.push(await studioLocation.save());
        locationsToSave.push(await bspLocation.save());
      } else if (campi[i].name === 'Vila Olímpia') {
        const gymLocation = new models.omniLocations({
          campus: campi[i]._id,
          name: 'Academia',
          createdBy: user,
          lastUpdatedBy: user,
        });
        locationsToSave.push(await gymLocation.save());
      }

      await models.omniCampi.findByIdAndUpdate(campi[i]._id, {
        $push: {
          locations: { $each: [mainLocation._id, secondaryLocation._id] },
        },
      });
    }
    return Promise.all(locationsToSave);
  } catch (err) {
    console.error(err);
  }
}
