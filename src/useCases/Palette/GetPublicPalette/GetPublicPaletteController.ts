import { Request, Response } from 'express';
import { IGetPaletteRequestDTO } from '../GetPalette/GetPaletteDTO';
import { GetPublicPaletteUseCase } from './GetPublicPaletteUseCase';

export class GetPublicPaletteController {
  constructor(private getPublicPaletteUseCase: GetPublicPaletteUseCase) {}

  handle = async (
    request: Request<IGetPaletteRequestDTO>,
    response: Response,
  ) => {
    try {
      const palette = await this.getPublicPaletteUseCase.execute(
        request.params,
      );
      return response.status(200).json({ palette });
    } catch (error) {
      return response.sendStatus(404);
    }
  };
}
