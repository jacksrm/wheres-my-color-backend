import { Model } from 'mongoose';
import Palette from '@entities/Palette';
import IPalettesRepository from '@repositories/IPalettesRepository';
import MongoDBUsersRepository from './MongoDBUsersRepository';

export default class MongoDBPalettesRepository implements IPalettesRepository {
  constructor(
    private PaletteModel: Model<Palette>,
    private usersRepository?: MongoDBUsersRepository,
  ) {}

  async save(palette: Palette): Promise<void> {
    const newPalette = new this.PaletteModel(palette);
    await newPalette.save();

    if (!this.usersRepository) throw new Error('No users repository provided!');

    const user = await this.usersRepository?.findById(palette.ownerId);

    if (!user) throw new Error("Couldn't find user with provided id!");

    user.palettes?.push(palette._id);
    await this.usersRepository.update(user);
  }

  async getPaletteById(paletteId: string, isPublic?: boolean): Promise<Palette | null> {
    const palette = isPublic
      ? await this.PaletteModel.findOne({ _id: paletteId, isPublic }).exec()
      : await this.PaletteModel.findById(paletteId).exec();
    return palette;
  }

  async getUserPalettes(ownerId: string): Promise<Palette[] | []> {
    const palette = await this.PaletteModel.find({ ownerId }).exec();
    return palette;
  }

  async getPublicUserPalettes(ownerId: string): Promise<Palette[] | []> {
    const palette = await this.PaletteModel.find({
      ownerId,
      isPublic: true,
    }).exec();
    return palette;
  }
}
