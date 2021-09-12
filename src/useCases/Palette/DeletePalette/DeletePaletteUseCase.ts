import { IPalettesRepository } from '@repositories/IPalettesRepository';
import { IDeletePaletteRequestDTO } from './DeletePaletteDTO';
import { DeletePaletteError } from './DeletePaletteError';

export class DeletePaletteUseCase {
  constructor(private paletteRepository: IPalettesRepository) {}

  execute = async ({ paletteId, ownerId }: IDeletePaletteRequestDTO) => {
    const match = await this.paletteRepository.getPaletteById(paletteId);

    if (!match) {
      throw new DeletePaletteError(
        404,
        "Couldn't find a palette with matching ID!",
      );
    }

    if (match.ownerId !== ownerId) {
      throw new DeletePaletteError(401, 'Unauthorized!');
    }

    const result = await this.paletteRepository.deletePalette(paletteId);

    if (!result.ok) {
      throw new DeletePaletteError(
        400,
        'There was and error on removing you palette!',
      );
    }
  };
}
