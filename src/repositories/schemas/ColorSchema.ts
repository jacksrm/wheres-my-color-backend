import { model, Schema } from 'mongoose';
import { Color } from '@entities/Color';

// TODO: ALterar value para ser objeto com hex e rgb
const ColorSchema = new Schema<Color>(
  {
    _id: {
      type: String,
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
    title: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ColorModel = model('Color', ColorSchema);

export { ColorSchema, ColorModel };
