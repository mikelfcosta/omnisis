import { Schema, Document, Model, model, Types } from 'mongoose';

export interface IOmniHoldersGroups extends Document {
  _id: Types.ObjectId;
  name: string;
  createdAt: Date;
  createdBy: string;
  lastUpdatedAt: Date;
  lastUpdatedBy: string;
}

export interface IOmniHoldersGroupsModel extends Model<IOmniHoldersGroups> {}

class HoldersGroups {
  public schema: Schema;

  constructor() {
    this.setSchema();
  }

  setSchema() {
    this.schema = new Schema({
      name: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: String, required: true, ref: 'OmniUsers' },
      lastUpdatedAt: { type: Date, default: Date.now },
      lastUpdatedBy: { type: String, required: true, ref: 'OmniUsers' },
    });
  }
}

const schema = new HoldersGroups().schema;
schema.loadClass(HoldersGroups);

export const omniHoldersGroups: IOmniHoldersGroupsModel = model<IOmniHoldersGroups, IOmniHoldersGroupsModel>('OmniHoldersGroups', schema);
export default omniHoldersGroups;
