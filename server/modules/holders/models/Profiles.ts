import { Schema, Document, Model, model } from 'mongoose';

export interface IOmniHoldersProfiles extends Document {
  _id: Schema.Types.ObjectId;
}

export interface IOmniHoldersProfilesModel extends Model<IOmniHoldersProfiles> {}

class HoldersProfiles {
  public schema: Schema;

  constructor() {
    this.setSchema();
  }

  setSchema() {
    this.schema = new Schema({

    });
  }
}

const schema = new HoldersProfiles().schema;
schema.loadClass(HoldersProfiles);

export const omniHoldersProfiles: IOmniHoldersProfilesModel = model<IOmniHoldersProfiles, IOmniHoldersProfilesModel>('OmniHoldersProfiles', schema);
export default omniHoldersProfiles;
