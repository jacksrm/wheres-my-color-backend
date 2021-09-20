import { Palette } from '@entities/Palette';

export interface IPalettesRepository {
  deletePalette(_id: string): Promise<{ ok?: boolean }>;
  deleteAllUserPalettes(ownerId: string): Promise<void>;
  getAllPublicPalettes(): Promise<Palette[]>;
  getUserPalettes(ownerId: string): Promise<Palette[]>;
  getPublicUserPalettes(ownerId: string): Promise<Palette[]>;
  getPaletteById(
    paletteId: string,
    isPublic?: boolean,
  ): Promise<Palette | null>;
  save(palette: Palette): Promise<Palette>;
  updatePalette(palette: Palette): Promise<Palette | null>;
}
