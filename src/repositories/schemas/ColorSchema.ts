import { Schema } from 'mongoose';
import Color from '@entities/Color';

const ColorSchema = new Schema<Color>({
  value: { type: String, require: true },
  title: String,
});

export default ColorSchema;
