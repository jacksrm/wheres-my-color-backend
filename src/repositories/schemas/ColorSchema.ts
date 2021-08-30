import { model, Schema } from 'mongoose';
import Color from '@entities/Color';

const ColorSchema = new Schema<Color>({
  _id: {
    type: String,
    require: true,
  },
  value: {
    type: String,
    require: true,
  },
  title: String,
});

const ColorModel = model('Color', ColorSchema);

export { ColorSchema, ColorModel };
