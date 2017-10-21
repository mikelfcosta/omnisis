import { Schema, Document, model } from 'mongoose';

export interface IOmniUsersLogsModel extends Document {
  _id: Schema.Types.ObjectId;
  action: string;
  user: string;
  dateTime: Date;
}

class UsersLogs {
  schema: Schema;

  constructor() {
    this.schema.loadClass(UsersLogs);
  }

  static get schema() {
    return new Schema({
      action: { type: String, required: true },
      user: { type: String, ref: 'OmniUsers', required: true },
      dateTime: { type: Date, default: Date.now },
    });
  }
}

export const usersLogsSchema = model<IOmniUsersLogsModel>('OminUsersLogs', UsersLogs.schema);
