import { Color } from '@entities/Color';
import { Palette } from '@entities/Palette';
import { IColorsRepository } from '@repositories/IColorsRepository';
import { Model } from 'mongoose';

export class MongoDBColorsRepository implements IColorsRepository {
  constructor(
    private ColorModel: Model<Color>,
    private PaletteModel: Model<Palette>,
  ) {}

  create = async (color: Color, paletteId: string): Promise<void> => {
    const palette = await this.PaletteModel.findById(paletteId).exec();

    if (!palette) throw new Error('Palette not found!');

    palette.colors?.push(new this.ColorModel(color));

    await palette.save();
  }

  updateColor = async (color: Color, paletteId: string) => {
    const palette = await this.PaletteModel.findById(paletteId);

    if (!palette) throw new Error('Palette not found!');

    palette.colors = palette.colors?.map<Color>((col) => {
      if (col._id === color._id) {
        return color;
      }

      return col;
    });

    palette.save();
  };

  findColorById = async (paletteId: string, colorId: string) => {
    const palette = await this.PaletteModel.findById(paletteId);

    const color = palette?.colors?.find((col) => col._id === colorId);

    return color ?? null;
  }
}
