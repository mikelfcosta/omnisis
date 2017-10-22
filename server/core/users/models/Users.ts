import { Schema, Document, model, NativeError, Model } from 'mongoose';
import './Roles';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export interface IOmniUsers extends Document {
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

export interface IOmniUsersModel extends Model<IOmniUsers> {
  generateAuthToken: (userinfo: any) => Promise<string>;
  removeToken: (_id: string) => void;
  findByToken: (token: string) => IOmniUsersModel | null;
  findByCredentials: (username: string, password: string) => IOmniUsers | null;
}

export enum ELoginErrors {
  NoUser = 'Usuário não encontrado',
  InactiveUser = 'Usuário inativo',
  NoPassword = 'Você ainda não definiu sua senha',
  IncorrectPassword = 'Senha incorreta',
}

class Users {
  public schema: Schema;

  constructor() {
    this.setSchema();
    this.schema.pre('save', this.hashPassword);
    this.schema.pre('update', this.hashPassword);
  }

  setSchema() {
    this.schema = new Schema({
      _id: { type: String, required: true },
      password: { type: String, required: true, default: null },
      roles: [{ type: Schema.Types.ObjectId, ref: 'OmniUsersRoles' }],
      active: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: String, ref: 'OmniUsers', required: true },
      lastLogin: { type: Date, default: null },
      tokens: [{ _id: false, access: String, token: String }],
      profile: {
        _id: false,
        name: String,
        id: String,
        image: String,
      },
    });
  }

  private async hashPassword(this: IOmniUsers, next: (err?: NativeError) => void) {
    if (this.isModified('password')) {
      try {
        this.password = await bcrypt.hash(<string>this.password, 8);
        return next();
      } catch (err) {
        return Promise.reject(err);
      }
    } else next();
  }

  static async generateAuthToken(this: IOmniUsers, user: IOmniUsers) {
    const userToTokenize = <IOmniUsers>user.toObject();
    delete userToTokenize.password;
    delete userToTokenize.tokens;
    const token = jwt.sign(userToTokenize, 'omniforyou').toString(); // Create a token with a secret
    user.tokens.push({ token, access: 'auth' }); // Add the token to the user document
    await user.save(); // Save the token and return it
    return token;
  }

  public static async removeToken(this: IOmniUsersModel, _id: string) {
    return await this.findByIdAndUpdate(_id, { tokens: [] }, { new: true });
  }

  public static async findByToken(this: IOmniUsersModel, token: string) {
    try {
      const decoded = <IOmniUsers>jwt.verify(token, 'omniforyou');
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

  public static async findByCredentials(this: IOmniUsersModel, username: string, password: string) {
    try {
      const user = <IOmniUsers>await this.findById(username, 'profile password roles active tokens').populate('roles');
      if (!user) return Promise.reject(ELoginErrors.NoUser);
      else if (!user.active) return Promise.reject(ELoginErrors.InactiveUser);
      else if (user.password === null) return Promise.reject(ELoginErrors.NoPassword);

      const correctPassword = await bcrypt.compare(password, user.password);
      if (correctPassword) return user;
      else return Promise.reject(ELoginErrors.IncorrectPassword);
    } catch (err) {
      throw err;
    }
  }

}

const schema = new Users().schema;
schema.loadClass(Users);

export const omniUsers: IOmniUsersModel = model<IOmniUsers, IOmniUsersModel>('OmniUsers', schema);
export default omniUsers;
