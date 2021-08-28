import ColorInterface from '@interfaces/ColorInterface';
import { Schema } from 'mongoose';

const ColorSchema = new Schema<ColorInterface>({
  value: { type: String, require: true },
  title: String,
});

export default ColorSchema;
