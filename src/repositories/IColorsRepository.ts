import { Color } from '@entities/Color';

export interface IColorsRepository {
  create(color: Color, paletteId: string): Promise<void>;
}
