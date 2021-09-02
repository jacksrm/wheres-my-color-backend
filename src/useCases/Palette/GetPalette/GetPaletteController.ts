import { Request, Response } from 'express';
import { IGetPaletteRequestDTO } from './GetPaletteDTO';
import GetPaletteUseCase from './GetPaletteUseCase';

export default class GetPaletteController {
  constructor(private getPaletteUseCase: GetPaletteUseCase) {}

  handle() {
    return async (
      request: Request<IGetPaletteRequestDTO>,
      response: Response,
    ) => {
      try {
        const palette = await this.getPaletteUseCase.execute(
          request.params,
        );
        return response.status(200).json({ palette });
      } catch (error) {
        return response
          .status(400)
          .json({ message: error.Message });
      }
    };
  }
}
