import { Palette } from '@entities/Palette';
import { IPalettesRepository } from '@repositories/IPalettesRepository';
import { IGetPaletteRequestDTO } from '../GetPalette/GetPaletteDTO';

export class GetPublicPaletteUseCase {
  constructor(private palettesRepository: IPalettesRepository) {}

  execute = async (data: IGetPaletteRequestDTO): Promise<Palette> => {
    const palette = await this.palettesRepository
      .getPaletteById(data.paletteId, true);

    if (!palette) throw new Error("This palette doesn't exists!");

    return palette;
  }
}
