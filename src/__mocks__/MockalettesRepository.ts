import { Model } from 'mongoose';
import Palette from '@entities/Palette';
import IPalettesRepository from '@repositories/IPalettesRepository';
import MongoDBUsersRepository from './MockUsersRepository';

export default class MockPalettesRepository {
  constructor() {}

  async save(palette: Palette) {}

  async getPaletteById(paletteId: string, isPublic?: boolean) {}

  async getUserPalettes(ownerId: string) {}

  async getPublicUserPalettes(ownerId: string) {}

  async updatePalette(palette: Palette) {}
}
