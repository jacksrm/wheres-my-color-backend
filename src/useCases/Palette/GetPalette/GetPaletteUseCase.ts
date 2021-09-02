import Palette from '@entities/Palette';
import IPaletteRepository from '@repositories/IPaletteRepository';
import { IGetPaletteRequestDTO } from './GetPaletteDTO';

export default class GetSinglePaletteUseCase {
  constructor(private paletteRepository: IPaletteRepository) {}

  async execute(data: IGetPaletteRequestDTO): Promise<Palette> {
    const palette = await this.paletteRepository.getSinglePalette(
      data.paletteId,
    );

    if (!palette) throw new Error("This palette doesn't exists!");

    return palette;
  }
}
