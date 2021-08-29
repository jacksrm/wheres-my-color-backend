import { Schema, Types } from 'mongoose';
import Color from '@entities/Color';
import Palette from '@entities/Palette';

const PaletteSchema = new Schema<Palette>({
  owner: { type: Types.ObjectId, require: true },
  colors: [typeof Color],
  name: { type: String, require: true },
  public: { type: Boolean, require: true },
  membersID: [Types.ObjectId],
  canChange: [Types.ObjectId],
});

export default PaletteSchema;
