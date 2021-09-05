import { Color } from '@entities/Color';

export interface IUpdatePaletteRequestBodyDTO {
  colors?: Color[];
  name?: string;
  isPublic?: boolean;
  membersId?: string[];
  authorizeChange?: string[];
}

export interface IUpdatePaletteRequestParamsDTO {
  paletteId: string;
}
