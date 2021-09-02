import Palette from '@entities/Palette';
import IPalettesRepository from '@repositories/IPalettesRepository';
import { IGetPaletteRequestDTO } from './GetPaletteDTO';

export default class GetSinglePaletteUseCase {
  constructor(private palettesRepository: IPalettesRepository) {}

  async execute(data: IGetPaletteRequestDTO): Promise<Palette> {
    const palette = await this.palettesRepository.getPaletteById(
      data.paletteId,
    );

    if (!palette) throw new Error("This palette doesn't exists!");

    return palette;
  }
}