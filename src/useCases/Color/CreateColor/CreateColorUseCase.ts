import { Color } from '@entities/Color';
import { IColorsRepository } from '@repositories/IColorsRepository';
import { ICreateColorRequestDTO } from './CreateColorDTO';

export class CreateColorUseCase {
  constructor(private colorRepo: IColorsRepository) {}

  execute = async ({ paletteId, values, title }: ICreateColorRequestDTO) => {
    if (!paletteId) throw new Error('PaletteId not informed!');

    if (!values) throw new Error('Value not informed!');

    const color = new Color({ values, title });

    await this.colorRepo.create(color, paletteId);
  }
}
