import { Palette } from '@entities/Palette';

export interface IPalettesRepository {
  getAllPublicPalettes(): Promise<Palette[]>;
  getUserPalettes(ownerId: string): Promise<Palette[]>;
  getPublicUserPalettes(ownerId: string): Promise<Palette[]>;
  getPaletteById(paletteId: String, isPublic?: boolean): Promise<Palette | null>;
  updatePalette(palette: Palette): Promise<Palette | null>;
  save(palette: Palette): Promise<Palette>;
}
