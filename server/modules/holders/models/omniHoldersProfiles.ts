import { Schema, Document, Model, model, Types } from 'mongoose';

export interface IOmniHoldersProfiles extends Document {
  _id: Types.ObjectId;
  name: string;
  locations: Types.ObjectId[];
  createdAt: Date;
  createdBy: string;
  lastUpdatedAt: Date;
  lastUpdatedBy: string;
}

export interface IOmniHoldersProfilesModel extends Model<IOmniHoldersProfiles> {}

class HoldersProfiles {
  public schema: Schema;

  constructor() {
    this.setSchema();
  }

  setSchema() {
    this.schema = new Schema({
      name: { type: String, required: true },
      locations: [{ type: Schema.Types.ObjectId, ref: 'OmniLocations' }],
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: String, required: true, ref: 'OmniUsers' },
      lastUpdatedAt: { type: Date, default: Date.now },
      lastUpdatedBy: { type: String, required: true, ref: 'OmniUsers' },
    });
  }
}

const schema = new HoldersProfiles().schema;
schema.loadClass(HoldersProfiles);

export const omniHoldersProfiles: IOmniHoldersProfilesModel = model<IOmniHoldersProfiles, IOmniHoldersProfilesModel>('OmniHoldersProfiles', schema);
export default omniHoldersProfiles;
