import { Color } from '@entities/Color';
import { IColorsRepository } from '@repositories/IColorsRepository';
import { IPalettesRepository } from '@repositories/IPalettesRepository';
import { IUpdateColorRequestDTO } from './UpdateColorDTO';
import { UpdateColorError } from './UpdateColorError';

export class UpdateColorUseCase {
  constructor(
    private colorRepo: IColorsRepository,
    private paletteRepo: IPalettesRepository,
  ) {}

  execute = async ({
    userId,
    paletteId,
    colorId,
    values,
    title,
  }: IUpdateColorRequestDTO) => {
    const palette = await this.paletteRepo.getPaletteById(paletteId);

    if (!palette?.authorizeChange.some((id) => id === userId)) {
      throw new UpdateColorError(401, 'Unauthorized!');
    }

    const color = await this.colorRepo.findColorById(paletteId, colorId);

    if (!color) throw new UpdateColorError(404, 'Color Not Found!');

    const updatedColor = new Color(
      {
        values: values ?? color.values,
        title: title ?? color.title,
      },
      colorId,
    );

    this.colorRepo.updateColor(updatedColor, paletteId);
  };
}
