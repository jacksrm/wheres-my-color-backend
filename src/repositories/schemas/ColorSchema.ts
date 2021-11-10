import { model, Schema } from 'mongoose';
import { Color } from '@entities/Color';

// TODO: ALterar value para ser objeto com hex e rgb
const ColorSchema = new Schema<Color>(
  {
    _id: {
      type: String,
      require: true,
    },
    values: {
      type: {
        hex: {
          type: String,
          require: true,
        },
        rgb: {
          type: String,
          require: true,
        },
      },
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
