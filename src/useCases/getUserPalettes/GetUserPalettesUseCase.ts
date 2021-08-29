import Palette from '@entities/Palette';
import IPaletteRepository from '@repositories/IPaletteRepository';
import { IGetUserPalettesRequestDTO } from './GetUserPalettesDTO';

export default class GetUserPalettesUseCase {
  constructor(private palettesRepository: IPaletteRepository) {}

  async execute(data: IGetUserPalettesRequestDTO): Promise<Palette[]> {
    const palettes = await this.palettesRepository.getUserPalettes(data.userId);
    return palettes;
  }
}
