import Palette from '@entities/Palette';

interface IPaletteRepository {
  getUserPalettes(userId: string): Promise<Palette[]>;
  getSinglePalette(paletteId: String): Promise<Palette | null>;
  save(palette: Palette): Promise<void>;
}

export default IPaletteRepository;
