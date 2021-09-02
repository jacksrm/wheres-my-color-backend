import IPaletteRepository from '@repositories/IPalettesRepository';
import { IGetUserPalettesRequestDTO } from '../GetUserPalettes/GetUserPalettesDTO';

export default class GetPublicUserPalettesUseCase {
  constructor(private palettesRepository: IPaletteRepository) {}

  async execute(data: IGetUserPalettesRequestDTO) {
    const palettes = await this.palettesRepository.getPublicUserPalettes(data.ownerId);
    return palettes;
  }
}
