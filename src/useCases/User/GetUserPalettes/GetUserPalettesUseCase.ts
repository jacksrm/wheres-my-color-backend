import Palette from '@entities/Palette';
import IPaletteRepository from '@repositories/IPalettesRepository';
import { IGetUserPalettesRequestDTO } from './GetUserPalettesDTO';

export class GetUserPalettesUseCase {
  constructor(private palettesRepository: IPaletteRepository) {}

  async execute(data: IGetUserPalettesRequestDTO): Promise<Palette[]> {
    const palettes = await this.palettesRepository.getUserPalettes(data.ownerId);
    return palettes;
  }
}
