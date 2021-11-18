import { Color } from '@entities/Color';

export interface IColorsRepository {
  create(color: Color, paletteId: string): Promise<void>;
  updateColor(color: Color, paletteId: string): Promise<void>;
  findColorById(paletteId: string, colorId: string): Promise<Color | null>;
  delete(colorId: string, paletteId: string): Promise<void>;
}
