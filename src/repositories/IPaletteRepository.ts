import Palette from '@entities/Palette';

interface IPaletteRepository {
  getUserPalettes(userId: string): Promise<Palette[]>;
  save(palette: Palette): Promise<void>;
}

export default IPaletteRepository;
