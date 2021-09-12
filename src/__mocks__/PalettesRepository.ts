import { Palette } from '@entities/Palette';
import { IPalettesRepository } from '@repositories/IPalettesRepository';
import { paletteCollection } from './paletteCollection';

export class PalettesRepository implements IPalettesRepository {
  deleteAllUserPalettes = (ownerId: string): Promise<void> => (
    new Promise((resolve) => resolve())
  );

  deletePalette = (
    _id: string,
  ): Promise<{ ok?: number, n?: number } & { deletedCount?: number }> => (
    new Promise((resolve) => {
      const match = this.getPaletteById(_id);

      if (!match) resolve({});

      resolve({ ok: 1 });
    })
  );

  getAllPublicPalettes = (): Promise<Palette[]> => (
    new Promise((resolve) => (
      resolve(paletteCollection().filter((palette) => palette.isPublic))
    ))
  );

  save = (palette: Palette): Promise<Palette> => (
    new Promise((resolve) => resolve(palette))
  );

  getPaletteById = (
    paletteId: string,
    isPublic?: boolean,
  ): Promise<Palette | null> => (
    new Promise((resolve) => {
      const match = paletteCollection().find(
        (palette) => palette._id === paletteId,
      );
      if (!match) return resolve(null);

      if (isPublic) return resolve(match.isPublic ? match : null);

      return resolve(match);
    })
  );

  getUserPalettes = (ownerId: string): Promise<Palette[] | []> => (
    new Promise((resolve) => {
      const match = paletteCollection().filter(
        (palette) => palette.ownerId === ownerId,
      );

      return resolve(match);
    })
  );

  getPublicUserPalettes = (ownerId: string): Promise<Palette[] | []> => (
    new Promise((resolve) => {
      const match = paletteCollection().filter(
        (palette) => palette.ownerId === ownerId && palette.isPublic,
      );

      return resolve(match);
    })
  );

  updatePalette = (paletteToUpdate: Palette): Promise<Palette | null> => (
    new Promise((resolve) => {
      const match = paletteCollection().find(
        (palette) => palette._id === paletteToUpdate._id,
      );
      if (match) resolve(paletteToUpdate);
      else resolve(null);
    })
  );
}
