import { Schema, Document, model, Model, Types } from 'mongoose';
import { IOmniHolders, default as omniHolders } from '../../holders/models/Holders';

export interface IOmniSmartCards extends Document {
  _id: string;
  assigned: boolean;
  student?: string | IOmniHolders;
  active: boolean;
  lastAssignedBy?: string;
  lastAssignedAt?: Date;
}

export interface IOmniSmartCardsModel extends Model<IOmniSmartCards> {
  checkStudent: (cardId: string) => { student: string, active: boolean, assigned: boolean, lastAssignedAt: Date, lastAssignedBy: string };
}

export enum ECardErrors {
  NoCardFound = 'CARTAO INVALIDO ',
}

class SmartCards {
  public schema: Schema;

  constructor() {
    this.setSchema();
  }

  setSchema() {
    this.schema = new Schema({
      _id: { type: String, required: true },
      assigned: { type: Boolean, default: false },
      student: { type: String, ref: 'OmniHolders' },
      active: { type: Boolean, default: false },
      lastAssignedBy: { type: String, ref: 'OmniUsers' },
      lastAssignedAt: Date,
    });
  }

  public static async checkStudent(this: IOmniSmartCardsModel, cardId: string) {
    const card = <IOmniSmartCards>await this.findById(cardId).populate('student');
    if (card) {
      // const isInside = await omniHolders
      return {
        student: (<IOmniHolders>card.student).name,
        active: card.active,
        assigned: card.assigned,
        lastAssignedAt: card.lastAssignedAt,
        lastAssignedBy: card.lastAssignedBy,
      };
    } else {
      return Promise.reject(ECardErrors.NoCardFound);
    }
  }
}

const schema = new SmartCards().schema;
schema.loadClass(SmartCards);

export const omniSmartCards: IOmniSmartCardsModel = model<IOmniSmartCards, IOmniSmartCardsModel>('OmniSmartCards', schema);
export default omniSmartCards;
