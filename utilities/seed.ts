import * as mongoose from 'mongoose';
import omniCampi from '../server/modules/locations/models/omniCampi';
import { groupsSeed } from './seed/groupsSeed';

(<any>mongoose).Promise = Promise;
mongoose.connect('mongodb://localhost:27017/iot', { useMongoClient: true });

export const models = {
  omniCampi,
};

export async function mainSeed() {
  try {
    await groupsSeed();
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
