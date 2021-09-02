import Palette from '@entities/Palette';

interface IPalettesRepository {
  getUserPalettes(ownerId: string): Promise<Palette[]>;
  getPublicUserPalettes(ownerId: string): Promise<Palette[]>;
  getPaletteById(paletteId: String, isPublic?: boolean): Promise<Palette | null>;
  updatePalette(palette: Palette): Promise<void>;
  save(palette: Palette): Promise<void>;
}

export default IPalettesRepository;
