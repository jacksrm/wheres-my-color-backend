import { Palette } from '@entities/Palette';
import { IPalettesRepository } from '@repositories/IPalettesRepository';
import { IGetPaletteRequestDTO } from './GetPaletteDTO';

export class GetPaletteUseCase {
  constructor(private palettesRepository: IPalettesRepository) {}

  execute = async (data: IGetPaletteRequestDTO): Promise<Palette> => {
    const palette = await this.palettesRepository.getPaletteById(
      data.paletteId,
    );

    if (!palette) throw new Error("This palette doesn't exists!");

    return palette;
  }
}
