import { Color } from '@entities/Color';
import { IColorsRepository } from '@repositories/IColorsRepository';

export class ColorsRepository implements IColorsRepository {
  create = (color: Color, paletteId: string): Promise<void> => (
    new Promise((resolve) => resolve())
  );
}
