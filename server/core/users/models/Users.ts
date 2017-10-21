import { Schema, Document, model } from 'mongoose';

export interface IOmniUsersModel extends Document {
  _id: string;
  password: string | null;
  role: Schema.Types.ObjectId[];
  active: boolean;
  createdAt: Date;
  createdBy: Schema.Types.ObjectId;
  lastLogin: Date;
  profile?: {
    name?: string;
    id?: string;
    image?: string;
  };
}

class Users {
  schema: Schema;

  constructor() {
    this.schema.loadClass(Users);
  }

  static get schema() {
    return new Schema({
      _id: { type: String, required: true },
      password: { type: String, required: true, default: null },
      roles: [{ type: Schema.Types.ObjectId, ref: 'OmniRoles' }],
      active: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: String, ref: 'OmniUsers', required: true },
      lastLogin: { type: Date, default: null },
      profile: {
        _id: false,
        name: String,
        id: String,
        image: String,
      },
    });
  }
}

export const omniUsers = model<IOmniUsersModel>('OmniUsers', Users.schema);
