import Palette from '@entities/Palette';
import IPalettesRepository from '@repositories/IPalettesRepository';
import { paletteCollection } from './paletteCollection';

export class PalettesRepository implements IPalettesRepository {
  getAllPublicPalettes(): Promise<Palette[]> {
    return new Promise((resolve) => (
      resolve(paletteCollection().filter((palette) => palette.isPublic))
    ));
  }

  save(palette: Palette): Promise<Palette> {
    return new Promise((resolve) => resolve(palette));
  }

  getPaletteById(
    paletteId: string,
    isPublic?: boolean,
  ): Promise<Palette | null> {
    return new Promise((resolve) => {
      const match = paletteCollection().find(
        (palette) => palette._id === paletteId,
      );
      if (!match) return resolve(null);

      if (isPublic) return resolve(match.isPublic ? match : null);

      return resolve(match);
    });
  }

  getUserPalettes(ownerId: string): Promise<Palette[] | []> {
    return new Promise((resolve) => {
      const match = paletteCollection().filter(
        (palette) => palette.ownerId === ownerId,
      );

      return resolve(match);
    });
  }

  getPublicUserPalettes(ownerId: string): Promise<Palette[] | []> {
    return new Promise((resolve) => {
      const match = paletteCollection().filter(
        (palette) => palette.ownerId === ownerId && palette.isPublic,
      );

      return resolve(match);
    });
  }

  updatePalette(paletteToUpdate: Palette): Promise<Palette | null> {
    return new Promise((resolve, reject) => {
      const match = paletteCollection().find(
        (palette) => palette._id === paletteToUpdate._id,
      );
      if (match) resolve(paletteToUpdate);
      else resolve(null);
    });
  }
}
