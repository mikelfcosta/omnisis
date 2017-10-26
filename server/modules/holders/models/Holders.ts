import { Schema, Document, Model, model } from 'mongoose';

export interface IOmniHolders extends Document {
  _id: Schema.Types.ObjectId;
}

export interface IOmniHoldersModel extends Model<IOmniHolders> {}

class Holders {
  public schema: Schema;

  constructor() {
    this.setSchema();
  }

  setSchema() {
    this.schema = new Schema({

    });
  }
}

const schema = new Holders().schema;
schema.loadClass(Holders);

export const omniHolders: IOmniHoldersModel = model<IOmniHolders, IOmniHoldersModel>('OmniHolders', schema);
export default omniHolders;
