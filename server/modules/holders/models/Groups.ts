import { Schema, Document, Model, model } from 'mongoose';

export interface IOmniHoldersGroups extends Document {
  _id: Schema.Types.ObjectId;
}

export interface IOmniHoldersGroupsModel extends Model<IOmniHoldersGroups> {}

class HoldersGroups {
  public schema: Schema;

  constructor() {
    this.setSchema();
  }

  setSchema() {
    this.schema = new Schema({

    });
  }
}

const schema = new HoldersGroups().schema;
schema.loadClass(HoldersGroups);

export const omniHoldersGroups: IOmniHoldersGroupsModel = model<IOmniHoldersGroups, IOmniHoldersGroupsModel>('OmniHoldersGroups', schema);
export default omniHoldersGroups;
