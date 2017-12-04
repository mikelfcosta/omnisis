import { random } from 'lodash';
import { models } from '../seed';

export async function campusSeed() {
  console.info('Starting Campus Seed');
  await models.omniCampi.remove({});
  const campi = ['Morumbi', 'Vila Olímpia', 'Paulista I', 'Paulista II', 'Mooca'];
  const users = ['michel.costa', 'joao.vitor'];
  const campusToSave = [];
  try {
    for (let i = 0; i < campi.length; i += 1) {
      const user = users[random(0, 1)];
      const newGroup = new models.omniCampi({
        name: campi[i],
        createdBy: user,
        lastUpdatedBy: user,
      });
      campusToSave.push(await newGroup.save());
    }
    return Promise.all(campusToSave);
  } catch (err) {
    console.error(err);
  }
}
