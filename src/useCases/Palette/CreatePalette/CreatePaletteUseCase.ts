import { Palette } from '@entities/Palette';
import { IPalettesRepository } from '@repositories/IPalettesRepository';
import { ICreatePaletteRequestDTO } from './CreatePaletteDTO';

export class CreatePaletteUseCase {
  constructor(private palettesRepositories: IPalettesRepository) {}

  execute = async (data: ICreatePaletteRequestDTO): Promise<Palette> => {
    const palette = new Palette(data);

    return this.palettesRepositories.save(palette);
  }
}
