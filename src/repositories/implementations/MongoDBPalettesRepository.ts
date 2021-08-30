import { Model } from 'mongoose';
import Palette from '@entities/Palette';
import IPaletteRepository from '@repositories/IPaletteRepository';
import MongoDBUsersRepository from './MongoDBUsersRepository';

export default class MongoDBPalettesRepository implements IPaletteRepository {
  constructor(
    private PaletteModel: Model<Palette>,
    private userRepository: MongoDBUsersRepository,
  ) {}

  async getUserPalettes(ownerId: string): Promise<Palette[] | []> {
    const palette = await this.PaletteModel.find({ ownerId }).exec();

    if (!palette) return [];

    return palette;
  }

  async save(palette: Palette): Promise<void> {
    const newPalette = new this.PaletteModel(palette);
    await newPalette.save();
    const user = await this.userRepository.findById(palette.ownerId);
    if (user) {
      user.palettes?.push(palette._id);
      await this.userRepository.update(user);
    }
  }
}
