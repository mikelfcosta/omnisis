import { Schema, Document, model, Model, Types } from 'mongoose';
import { IOmniHolders } from '../../holders/models/Holders';

export interface IOmniSmartCardsLogs extends Document {
  _id: Types.ObjectId;
  machineId: string;
  machineLocation: string;
  holderCard: string;
  holderId: string;
  holderGroup: string;
  accessType: string;
  timestamp: Date;
}

export interface IOmniSmartCardsLogsModel extends Model<IOmniSmartCardsLogs> {
  createLog: (user: IOmniHolders, machine: string) => Promise<void>;
  isInside: (card: string, user: string) => Promise<boolean>;
}

class SmartCards {
  public schema: Schema;

  constructor() {
    this.setSchema();
  }

  setSchema() {
    this.schema = new Schema({
      machineId: { type: String, ref: 'OmniSmartMachines' },
      machineLocation: { type: String, ref: 'OmniSmartLocations' },
      holderCard: { type: String, ref: 'OmniSmartCards' },
      holderId: { type: String, ref: 'OmniHolders' },
      holderGroup: { type: String },
      accessType: { type: String, enum: ['in', 'out'] },
      timestamp: { type: Date, default: Date.now },
    });
  }

  public static async createLog(this: IOmniSmartCardsLogsModel, user: IOmniHolders, machine: string): Promise<void> {
    try {
      if (!user.activeCard) return Promise.reject('No card active');
      const hasEnteredToday = await this.isInside(user.activeCard, user._id);
      const log = new this({
        machineId: machine,
        machineLocation: null,
        holderCard: user.activeCard,
        holderId: user._id,
        holderGroup: user.group,
        accessType: hasEnteredToday ? 'out' : 'in',
      });
      await log.save();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public static async isInside(this: IOmniSmartCardsLogsModel, card: string, user: string): Promise<boolean> {
    try {
      const log = await this.findOne({ holderCard: card, holderId: user }).sort('-timestamp');
      if (!log) return Promise.resolve(false);
      else return Promise.resolve(log.accessType === 'in');
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const schema = new SmartCards().schema;
schema.loadClass(SmartCards);

export const omniSmartCardsLogs: IOmniSmartCardsLogsModel = model<IOmniSmartCardsLogs, IOmniSmartCardsLogsModel>('OmniSmartCardsLogs', schema);
export default omniSmartCardsLogs;
