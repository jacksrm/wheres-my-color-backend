import Palette from '@entities/Palette';
import IPaletteRepository from '@repositories/IPaletteRepository';
import { IGetSinglePaletteRequestDTO } from './GetSinglePaletteDTO';

export default class GetSinglePaletteUseCase {
  constructor(private paletteRepository: IPaletteRepository) {}

  async execute(data: IGetSinglePaletteRequestDTO): Promise<Palette> {
    const palette = await this.paletteRepository.getSinglePalette(
      data.paletteId,
    );

    if (!palette) throw new Error("This palette doesn't exists!");

    return palette;
  }
}
