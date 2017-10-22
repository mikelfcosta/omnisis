import { Schema, Document, model, NativeError } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export interface IOmniUsersModel extends Document {
  _id: string;
  password: string | null;
  role: Schema.Types.ObjectId[];
  active: boolean;
  createdAt: Date;
  createdBy: Schema.Types.ObjectId;
  lastLogin: Date;
  tokens: { access: string, token: string }[];
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
      tokens: [{ access: String, token: String }],
      profile: {
        _id: false,
        name: String,
        id: String,
        image: String,
      },
    });
  }

  private async hashPassword(this: IOmniUsersModel, next: (err?: NativeError) => void) {
    if (this.isModified('password')) {
      try {
        this.password = await bcrypt.hash(<string>this.password, 8);
        return next();
      } catch (err) {
        return Promise.reject(err);
      }
    } else next();
  }

  public async generateAuthToken(this: IOmniUsersModel, userinfo: any) {
    const token = jwt.sign(userinfo, 'omniforyou').toString(); // Create a token with a secret
    this.tokens.push({ token, access: 'auth' }); // Add the token to the user document
    return await this.save(); // Save the token and return it
  }

  public static async removeToken(this: any, _id: string) {
    return await this.findByIdAndUpdate(_id, { tokens: [] }, { new: true });
  }

  public static async findByToken(this: any, token: string) {
    try {
      const decoded = <IOmniUsersModel>jwt.verify(token, 'omniforyou');
      return await this.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth',
      })
        .populate('role', 'name level')
        .lean();

    } catch (err) {
      throw err;
    }
  }

  public static async findByCredentials(this: any, username: string, password: string) {
    try {
      const user = this.findById(username)
        .populate('role permissions');
      if (!user) return Promise.reject(0);
      else if (!user.active) return Promise.reject(1);
      else if (user.password === null) return Promise.reject(2);

      const correctPassword = await bcrypt.compare(password, user.password);
      if (correctPassword) return user;
      else return Promise.reject(3);
    } catch (err) {
      throw err;
    }
  }

}

export const omniUsers = model<IOmniUsersModel>('OmniUsers', new Users().schema);
