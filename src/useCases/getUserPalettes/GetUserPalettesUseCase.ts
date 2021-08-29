import Palette from '@entities/Palette';
import IPaletteRepository from '@repositories/IPaletteRepository';

export default class GetUserPalettesUseCase {
  constructor(private palettesRepository: IPaletteRepository) {}

  async execute(data: string): Promise<Palette[]> {
    const palettes = await this.palettesRepository.getUserPalettes(data);
    return palettes;
  }
}
