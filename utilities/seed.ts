import * as mongoose from 'mongoose';
import omniCampi from '../server/modules/locations/models/omniCampi';
import omniHoldersGroups from '../server/modules/holders/models/omniHoldersGroups';
import omniLocations from '../server/modules/locations/models/omniLocations';
import { groupsSeed } from './seed/groupsSeed';
import { campusSeed } from './seed/campusSeed';
import { locationsSeed } from './seed/locationsSeed';

(<any>mongoose).Promise = Promise;
mongoose.connect('mongodb://localhost:27017/iot', { useMongoClient: true });

export const models = {
  omniCampi,
  omniHoldersGroups,
  omniLocations,
};

export async function mainSeed() {
  try {
    await groupsSeed();
    await campusSeed();
    await locationsSeed();
  } catch (err) {
    return Promise.reject(err);
  }
}

mainSeed()
  .then(() => {
    console.log('Done');
    return process.exit(0);
  })
  .catch(err => {
    console.error(err);
    return process.exit(1);
  });
