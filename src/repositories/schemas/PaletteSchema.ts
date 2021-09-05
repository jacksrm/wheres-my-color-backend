import { model, Schema } from 'mongoose';
import { Palette } from '@entities/Palette';
import { ColorSchema } from './ColorSchema';

const PaletteSchema = new Schema<Palette>({
  _id: {
    type: String,
    require: true,
  },
  ownerId: {
    type: String,
    require: true,
  },
  colors: {
    type: [ColorSchema],
    default: [],
  },
  name: {
    type: String,
    require: true,
  },
  isPublic: {
    type: Boolean,
    require: true,
  },
  membersId: [String],
  authorizeChange: [String],
});

const PaletteModel = model('Palette', PaletteSchema, 'Palettes');

export { PaletteSchema, PaletteModel };
