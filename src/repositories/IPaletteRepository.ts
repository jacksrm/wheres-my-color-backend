import Palette from '@entities/Palette';

interface IPaletteRepository {
  getUserPalettes(userId: string): Promise<Palette[]>;
  getSinglePalette(paletteId: String): Promise<Palette>;
  save(palette: Palette): Promise<void>;
}

export default IPaletteRepository;
