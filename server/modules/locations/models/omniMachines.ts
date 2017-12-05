import { Schema, Document, Model, model, Types } from 'mongoose';
import { IOmniLocations } from './omniLocations';

export interface IOmniMachines extends Document {
  _id: Types.ObjectId;
  status: boolean;
  location: Types.ObjectId | IOmniLocations;
  createdAt: Date;
  createdBy: string;
  lastUpdatedAt: Date;
  lastUpdatedBy: string;
}

export interface IOmniMachinesModel extends Model<IOmniMachines> {}

class OmniMachines {
  public schema: Schema;

  constructor() {
    this.setSchema();
  }

  setSchema() {
    this.schema = new Schema({
      status: { type: Boolean, default: true },
      location: { type: Schema.Types.ObjectId, ref: 'OmniLocations' },
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: String, required: true, ref: 'OmniUsers' },
      lastUpdatedAt: { type: Date, default: Date.now },
      lastUpdatedBy: { type: String, required: true, ref: 'OmniUsers' },
    });
  }
}

const schema = new OmniMachines().schema;
schema.loadClass(OmniMachines);

export const omniMachines: IOmniMachinesModel = model<IOmniMachines, IOmniMachinesModel>('OmniMachines', schema);
export default omniMachines;
