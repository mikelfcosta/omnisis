import { Schema, Document } from 'mongoose';

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
      roles: [{ type: Schema.Types.ObjectId, ref: 'OmniRoles', required: true }],
      active: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: Schema.Types.ObjectId, ref: 'OmniUsers', required: true },
      lastLogin: { type: Date, default: Date.now },
      profile: {
        _id: false,
        name: String,
        id: String,
        image: String,
      },
    });
  }
}

export const usersSchema = Users;
