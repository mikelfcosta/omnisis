import { random } from 'lodash';
import { models } from '../seed';

export default async function profilesSeed() {
  console.info('Starting Profiles Seed');
  await models.omniHoldersProfiles.remove({});
  const profiles = ['Acesso Básico', 'Estudio', 'Academia', 'BSP', 'Acesso Completo'];
  const users = ['michel.costa', 'joao.vitor'];
  const profilesToSave = [];
  try {
    const locations = await models.omniLocations.find({});

    // Acesso Basico
    const basicAccessLocations = locations
      .filter(location => (location.name === 'Entrada Principal' || location.name === 'Entrada Secundária'))
      .map(location => location._id);
    const basicAccessProfile = new models.omniHoldersProfiles({
      name: profiles[0],
      locations: basicAccessLocations,
      createdBy: users[random(0, 1)],
      lastUpdatedBy: users[random(0, 1)],
    });
    profilesToSave.push(await basicAccessProfile.save());

    // Estúdio
    const studioLocation = locations
      .filter(location => location.name === 'Estúdio')
      .map(location => location._id);
    const studioProfile = new models.omniHoldersProfiles({
      name: profiles[1],
      locations: studioLocation,
      createdBy: users[random(0, 1)],
      lastUpdatedBy: users[random(0, 1)],
    });
    profilesToSave.push(await studioProfile.save());

    // Academia
    const gymLocation = locations
      .filter(location => location.name === 'Academia')
      .map(location => location._id);
    const gymProfile = new models.omniHoldersProfiles({
      name: profiles[2],
      locations: gymLocation,
      createdBy: users[random(0, 1)],
      lastUpdatedBy: users[random(0, 1)],
    });
    profilesToSave.push(await gymProfile.save());

    // BSP
    const bspLocation = locations
      .filter(location => location.name === 'BSP')
      .map(location => location._id);
    const bspProfile = new models.omniHoldersProfiles({
      name: profiles[3],
      locations: bspLocation,
      createdBy: users[random(0, 1)],
      lastUpdatedBy: users[random(0, 1)],
    });
    profilesToSave.push(await bspProfile.save());

    // Acesso Completo
    const completeLocation = locations
      .map(location => location._id);
    const completeProfile = new models.omniHoldersProfiles({
      name: profiles[4],
      locations: completeLocation,
      createdBy: users[random(0, 1)],
      lastUpdatedBy: users[random(0, 1)],
    });
    profilesToSave.push(await completeProfile.save());

    return Promise.all(profilesToSave);
  } catch (err) {
    console.error(err);
  }
}
