import Palette from '@entities/Palette';
import IPalettesRepository from '@repositories/IPalettesRepository';
import { ICreatePaletteRequestDTO } from './CreatePaletteDTO';

export default class CreatePaletteUseCase {
  constructor(private palettesRepositories: IPalettesRepository) {}

  async execute(data: ICreatePaletteRequestDTO): Promise<void> {
    const palette = new Palette(data);

    await this.palettesRepositories.save(palette);
  }
}
