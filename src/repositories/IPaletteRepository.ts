import Palette from '@entities/Palette';

interface IPaletteRepository {
  getUserPalettes(userId: string): Promise<Palette[]>
}

export default IPaletteRepository;
