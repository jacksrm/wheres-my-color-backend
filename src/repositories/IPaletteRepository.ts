import Palette from '@entities/Palette';

interface IPaletteRepository {
  getUserPalettes(ownerId: string): Promise<Palette[]>;
  getPublicUserPalettes(ownerId: string): Promise<Palette[]>;
  getSinglePalette(paletteId: String): Promise<Palette | null>;
  save(palette: Palette): Promise<void>;
}

export default IPaletteRepository;
