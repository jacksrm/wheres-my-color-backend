import { Color } from '@entities/Color';
import { IColorsRepository } from '@repositories/IColorsRepository';
import { IPalettesRepository } from '@repositories/IPalettesRepository';
import { ICreateColorRequestDTO } from './CreateColorDTO';

export class CreateColorUseCase {
  constructor(
    private colorRepo: IColorsRepository,
    private paletteRepo: IPalettesRepository,
  ) {}

  execute = async ({ paletteId, values, title, userId }: ICreateColorRequestDTO) => {
    const palette = await this.paletteRepo.getPaletteById(paletteId);

    if (!palette?.authorizeChange.some((id) => id === userId)) {
      throw new Error('Unauthorized!');
    }

    const color = new Color({ values, title });

    await this.colorRepo.create(color, paletteId);
  }
}
