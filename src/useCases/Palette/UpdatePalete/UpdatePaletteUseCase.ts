import Palette from '@entities/Palette';
import IPalettesRepository from '@repositories/IPalettesRepository';
import UpdatePaletteError from './UpdatePaletteError';
import {
  IUpdatePaletteRequestBodyDTO,
  IUpdatePaletteRequestParamsDTO,
} from './UpdatePaletteDTO';

export default class UpdatePaletteUseCase {
  constructor(private palettesRepository: IPalettesRepository) {}

  async execute(
    data: IUpdatePaletteRequestBodyDTO & IUpdatePaletteRequestParamsDTO,
    userId: string,
  ) {
    const matchPalette = await this.palettesRepository.getPaletteById(
      data.paletteId,
    );

    if (!matchPalette) throw new UpdatePaletteError(404, "Can't update this palette!");

    const canChange = matchPalette.authorizeChange.some(
      (authorizedUserId) => userId === authorizedUserId,
    );
    if (!canChange) {
      throw new UpdatePaletteError(400, 'Unauthorized!');
    }

    const palette = new Palette(
      {
        colors: data.colors ?? matchPalette.colors,
        ownerId: matchPalette.ownerId,
        name: data.name ?? matchPalette.name,
        isPublic: data.isPublic ?? matchPalette.isPublic,
        membersId: data.membersId ?? matchPalette.membersId,
        authorizeChange: data.authorizeChange ?? matchPalette.authorizeChange,
      },
      data.paletteId,
    );

    await this.palettesRepository.updatePalette(palette);
  }
}
