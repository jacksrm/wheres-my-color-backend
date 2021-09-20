import { Model } from 'mongoose';
import { Palette } from '@entities/Palette';
import { IPalettesRepository } from '@repositories/IPalettesRepository';

export class MongoDBPalettesRepository implements IPalettesRepository {
  constructor(private PaletteModel: Model<Palette>) {}

  deleteAllUserPalettes = async (ownerId: string) => {
    await this.PaletteModel.deleteMany({ ownerId });
  };

  deletePalette = async (_id: string) => {
    const response = await this.PaletteModel.deleteOne({ _id });
    return { ok: !!response.ok };
  };

  getPaletteById = async (
    paletteId: string,
    isPublic?: boolean,
  ): Promise<Palette | null> => {
    const palette = isPublic
      ? await this.PaletteModel.findOne({ _id: paletteId, isPublic }).exec()
      : await this.PaletteModel.findOne({ _id: paletteId }).exec();
    return palette ? new Palette(palette, palette._id) : null;
  };

  getAllPublicPalettes = async (): Promise<Palette[]> => {
    const palettes = await this.PaletteModel.find({ isPublic: true }).exec();
    return palettes.map((palette) => new Palette(palette, palette._id));
  };

  getPublicUserPalettes = async (ownerId: string): Promise<Palette[]> => {
    const palettes = await this.PaletteModel.find({
      ownerId,
      isPublic: true,
    }).exec();
    return palettes.map((palette) => new Palette(palette, palette._id));
  };

  getUserPalettes = async (ownerId: string): Promise<Palette[] | []> => {
    const palettes = await this.PaletteModel.find({ ownerId }).exec();
    return palettes.map((palette) => new Palette(palette, palette._id));
  };

  save = async (palette: Palette): Promise<Palette> => {
    const newPalette = new this.PaletteModel(palette);
    const response = await newPalette.save();
    return new Palette(response, response._id);
  };

  updatePalette = async (palette: Palette): Promise<Palette | null> => {
    const { _id, name, isPublic, colors, membersId, authorizeChange } = palette;
    const response = await this.PaletteModel.findOneAndUpdate(
      { _id },
      {
        name,
        isPublic,
        colors,
        membersId,
        authorizeChange,
      },
    );

    return response ? new Palette(response, response._id) : null;
  };
}
