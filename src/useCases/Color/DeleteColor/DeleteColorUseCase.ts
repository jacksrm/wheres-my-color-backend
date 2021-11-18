import { IColorsRepository } from '@repositories/IColorsRepository';
import { IPalettesRepository } from '@repositories/IPalettesRepository';
import { IDeleteColorRequestDTO } from './DeleteColorDTO';
import { DeleteColorError } from './DeleteColorError';

export class DeleteColorUseCase {
  constructor(
    private colorRepo: IColorsRepository,
    private paletteRepo: IPalettesRepository,
  ) {}

  execute = async ({ colorId, paletteId, userId }: IDeleteColorRequestDTO) => {
    const palette = await this.paletteRepo.getPaletteById(paletteId);

    if (palette?.authorizeChange?.some((id) => id !== userId)) {
      throw new DeleteColorError(401, 'Unauthorized!');
    }

    await this.colorRepo.delete(colorId, paletteId);
  }
}
