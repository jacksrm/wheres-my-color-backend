import Color from '@entities/Color';
import { Schema } from 'mongoose';

const ColorSchema = new Schema<Color>({
  value: { type: String, require: true },
  title: String,
});

export default ColorSchema;
