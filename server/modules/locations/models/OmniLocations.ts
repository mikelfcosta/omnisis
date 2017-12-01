import { Schema, Document, Model, model } from 'mongoose';

export interface IOmniLocations extends Document {
  _id: Schema.Types.ObjectId;
}

export interface IOmniLocationsModel extends Model<IOmniLocations> {}

class OmniLocations {
  public schema: Schema;

  constructor() {
    this.setSchema();
  }

  setSchema() {
    this.schema = new Schema({
      campus: { type: String, required: true },
      name: { type: String, required: true },
      machines: [{ type: Schema.Types.ObjectId, ref: 'OmniMachines' }],
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: String, required: true, ref: 'OmniUsers' },
      lastUpdatedAt: { type: String, default: Date.now },
      lastUpdatedBy: { type: Date, required: true, ref: 'OmniUsers' },
    });
  }
}

const schema = new OmniLocations().schema;
schema.loadClass(OmniLocations);

export const omniLocations: IOmniLocationsModel = model<IOmniLocations, IOmniLocationsModel>('OmniLocations', schema);
export default omniLocations;
