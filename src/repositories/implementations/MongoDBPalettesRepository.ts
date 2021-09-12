import { Model } from 'mongoose';
import { Palette } from '@entities/Palette';
import { IPalettesRepository } from '@repositories/IPalettesRepository';

export class MongoDBPalettesRepository implements IPalettesRepository {
  constructor(
    private PaletteModel: Model<Palette>,
  ) {}

  deleteAllUserPalettes = async (ownerId: string) => {
    await this.PaletteModel.deleteMany({ ownerId });
  }

  deletePalette = async (_id: string) => (
    this.PaletteModel.deleteOne({ _id })
  );

  getPaletteById = async (
    paletteId: string,
    isPublic?: boolean,
  ): Promise<Palette | null> => {
    const palette = isPublic
      ? await this.PaletteModel.findOne({ _id: paletteId, isPublic }).exec()
      : await this.PaletteModel.findOne({ _id: paletteId }).exec();
    return palette;
  }

  getAllPublicPalettes = (): Promise<Palette[]> => (
    this.PaletteModel.find({ isPublic: true }).exec()
  );

  getPublicUserPalettes = async (
    ownerId: string,
  ): Promise<Palette[] | []> => {
    const palette = await this.PaletteModel.find({
      ownerId,
      isPublic: true,
    }).exec();
    return palette;
  }

  getUserPalettes = async (ownerId: string): Promise<Palette[] | []> => {
    const palette = await this.PaletteModel.find({ ownerId }).exec();
    return palette;
  }

  save = async (palette: Palette): Promise<Palette> => {
    const newPalette = new this.PaletteModel(palette);
    return newPalette.save();
  }

  updatePalette = async (palette: Palette): Promise<Palette | null> => (
    this.PaletteModel.findOneAndUpdate({ _id: palette._id }, palette)
  );
}
