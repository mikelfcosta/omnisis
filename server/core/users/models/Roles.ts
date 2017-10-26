import { Schema, Document, model } from 'mongoose';

export interface IOmniUsersRolesModel extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  level: number;
  createdAt: Date;
  createdBy: String;
  lastUpdatedAt: Date;
  lastUpdatedBy: String;
}

class Roles {
  schema: Schema;

  constructor() {
    this.schema.loadClass(Roles);
  }

  static get schema() {
    return new Schema({
      name: { type: String, required: true },
      level: { type: Number, min: 1, max: 10, default: 1 },
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: String, ref: 'OmniUsers', required: true },
      lastUpdatedAt: { type: Date, default: Date.now },
      lastUpdatedBy: { type: String, ref: 'OmniUsers', required: true },
    });
  }
}

export const omniUsersRoles = model<IOmniUsersRolesModel>('OmniUsersRoles', Roles.schema);
export default omniUsersRoles;
