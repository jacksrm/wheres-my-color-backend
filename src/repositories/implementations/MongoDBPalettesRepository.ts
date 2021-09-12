import { Model } from 'mongoose';
import { Palette } from '@entities/Palette';
import { IPalettesRepository } from '@repositories/IPalettesRepository';

export class MongoDBPalettesRepository implements IPalettesRepository {
  constructor(
    private PaletteModel: Model<Palette>,
  ) {}

  async deletePalette(_id: string) {
    return this.PaletteModel.deleteOne({ _id });
  }

  async getPaletteById(paletteId: string, isPublic?: boolean): Promise<Palette | null> {
    const palette = isPublic
      ? await this.PaletteModel.findOne({ _id: paletteId, isPublic }).exec()
      : await this.PaletteModel.findOne({ _id: paletteId }).exec();
    return palette;
  }

  getAllPublicPalettes(): Promise<Palette[]> {
    return this.PaletteModel.find({ isPublic: true }).exec();
  }

  async getPublicUserPalettes(ownerId: string): Promise<Palette[] | []> {
    const palette = await this.PaletteModel.find({
      ownerId,
      isPublic: true,
    }).exec();
    return palette;
  }

  async getUserPalettes(ownerId: string): Promise<Palette[] | []> {
    const palette = await this.PaletteModel.find({ ownerId }).exec();
    return palette;
  }

  async save(palette: Palette): Promise<Palette> {
    const newPalette = new this.PaletteModel(palette);
    return newPalette.save();
  }

  async updatePalette(palette: Palette): Promise<Palette | null> {
    return this.PaletteModel.findOneAndUpdate({ _id: palette._id }, palette);
  }
}
