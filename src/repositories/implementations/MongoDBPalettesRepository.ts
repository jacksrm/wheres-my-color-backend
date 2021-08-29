import Palette from '@entities/Palette';
import User from '@entities/User';
import IPaletteRepository from '@repositories/IPaletteRepository';
import { Model } from 'mongoose';
import MongoDBUsersRepository from './MongoDBUsersRepository';

export default class MongoDBPalettesRepository implements IPaletteRepository {
  constructor(
    private PaletteModel: Model<Palette>,
    private userRepository: MongoDBUsersRepository,
  ) {}

  async getUserPalettes(userId: string): Promise<Palette[] | []> {
    const palette = await this.PaletteModel.find({ ownerId: userId }).exec();

    if (!palette) return [];

    return palette;
  }

  async save(palette: Palette): Promise<void> {
    console.log(palette);
    const newPalette = new this.PaletteModel(palette);
    await newPalette.save();
    const user = await this.userRepository.findById(palette.ownerId);
    if (user) {
      user.palettes?.push(palette.id);
      console.log(user);
      await this.userRepository.update(user);
    }
  }
}
