import PaletteInterface from '@interfaces/PaletteInterface';
import { Schema, Types } from 'mongoose';
import ColorSchema from './ColorSchema';

const PaletteSchema = new Schema<PaletteInterface>({
  owner: { type: Types.ObjectId, require: true },
  colors: [ColorSchema],
  name: { type: String, require: true },
  public: { type: Boolean, require: true },
  membersID: [Types.ObjectId],
  canChange: [Types.ObjectId],
});

export default PaletteSchema;
