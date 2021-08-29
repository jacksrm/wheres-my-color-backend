import Palette from '@entities/Palette';
import IPaletteRepository from '@repositories/IPaletteRepository';
import { ICreatePaletteRequestDTO } from './CreatePaleteteDTO';

export default class CreatePaletteUseCase {
  constructor(private paletteRepositories: IPaletteRepository) {

  }

  async execute(data: ICreatePaletteRequestDTO): Promise<void> {
    const palette = new Palette(data);

    await this.paletteRepositories.save(palette);
  }
}
