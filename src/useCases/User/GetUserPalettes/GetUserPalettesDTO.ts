import { Request } from 'express';

export interface IGetUserPalettesRequestDTO {
  ownerId: string;
}

export interface IGetUserPaletteRequestWithUserID extends Request {
  userId?: string;
}
