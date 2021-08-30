import { Model } from 'mongoose';
import Palette from '@entities/Palette';
import IPaletteRepository from '@repositories/IPaletteRepository';
import MongoDBUsersRepository from './MongoDBUsersRepository';

export default class MongoDBPalettesRepository implements IPaletteRepository {
  constructor(
    private PaletteModel: Model<Palette>,
    private userRepository: MongoDBUsersRepository,
  ) {}

  async save(palette: Palette): Promise<void> {
    const newPalette = new this.PaletteModel(palette);
    await newPalette.save();
    const user = await this.userRepository.findById(palette.ownerId);
    if (user) {
      user.palettes?.push(palette._id);
      await this.userRepository.update(user);
    }
  }

  async getSinglePalette(paletteId: String): Promise<Palette | null> {
    const palette = await this.PaletteModel.findById(paletteId).exec();
    return palette;
  }

  async getUserPalettes(ownerId: string): Promise<Palette[] | []> {
    const palette = await this.PaletteModel.find({ ownerId }).exec();
    return palette;
  }
}
