import { Schema, Document, model, NativeError } from 'mongoose';
import * as bcrypt from 'bcryptjs';

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
  public schema: Schema;

  constructor() {
    this.setSchema();
    this.schema.loadClass(Users);
    this.schema.pre('save', this.hashPassword);
    this.schema.pre('update', this.hashPassword);
  }

  setSchema() {
    this.schema = new Schema({
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

  async hashPassword(this: IOmniUsersModel, next: (err?: NativeError) => void) {
    if (this.isModified('password')) {
      try {
        this.password = await bcrypt.hash(<string>this.password, 8);
        return next();
      } catch (err) {
        return Promise.reject(err);
      }
    } else next();
  }

}


export const omniUsers = model<IOmniUsersModel>('OmniUsers', new Users().schema);
