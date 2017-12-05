import { Types, Schema, Document, Model, model } from 'mongoose';
import { IOmniHoldersGroups } from './omniHoldersGroups';

export interface IOmniHolders extends Document {
  _id: string;
  name: string;
  type: string;
  group: Types.ObjectId | IOmniHoldersGroups;
  activeCard: string | null;
  student: {
    mainCampus?: Types.ObjectId;
    activeCourse?: Types.ObjectId;
    activeCourseStart?: Date;
    activeCourseEnd?: Date;
    currentSemester?: number;
  };
  staff: {
    job?: string;
    campus?: { type: Types.ObjectId }[];
    worksheet?: {
      _id: Types.ObjectId;
      weekday: string;
      timeslots: { _id: Types.ObjectId, start: string, end: string }[];
    };
  };
  createdAt: Date;
  createdBy: string;
  lastUpdatedAt: Date;
  lastUpdatedBy: string;
}

export interface IOmniHoldersModel extends Model<IOmniHolders> {}

class Holders {
  public schema: Schema;

  constructor() {
    this.setSchema();
  }

  setSchema() {
    this.schema = new Schema({
      _id: { type: String, required: true },
      name: { type: String, required: true },
      group: { type: Schema.Types.ObjectId, ref: 'OmniHoldersGroups', required: true },
      profiles: [{ type: Schema.Types.ObjectId, ref: 'OmniHoldersProfiles', required: true }],
      activeCard: { type: String, ref: 'OmniSmartCards' },
      student: {
        _id: false,
        mainCampus: { type: Schema.Types.ObjectId },
        activeCourse: { type: Schema.Types.ObjectId },
        activeCourseStart: Date,
        activeCourseEnd: Date,
        currentSemester: Number,
      },
      staff: {
        _id: false,
        job: String,
        campus: [{ _id: false, type: Schema.Types.ObjectId }],
      },
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: String, required: true, ref: 'OmniUsers' },
      lastUpdatedAt: { type: Date, default: Date.now },
      lastUpdatedBy: { type: String, required: true, ref: 'OmniUsers' },
    });
  }
}

const schema = new Holders().schema;
schema.loadClass(Holders);

export const omniHolders: IOmniHoldersModel = model<IOmniHolders, IOmniHoldersModel>('OmniHolders', schema);
export default omniHolders;
