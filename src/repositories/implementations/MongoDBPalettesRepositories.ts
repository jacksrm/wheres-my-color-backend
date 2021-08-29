import Palette from '@entities/Palette';
import IPaletteRepository from '@repositories/IPaletteRepository';
import { Model } from 'mongoose';

export default class MongoDBPalettesRepositories implements IPaletteRepository {
  constructor(private PaletteModel: Model<Palette>) {}

  async getUserPalettes(userId: string): Promise<Palette[] | []> {
    const palette = await this.PaletteModel.find({ owner: userId });

    if (!palette) return [];

    return palette;
  }
}
