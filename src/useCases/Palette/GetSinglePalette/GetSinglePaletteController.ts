import { Request, Response } from 'express';
import { IGetSinglePaletteRequestDTO } from './GetSinglePaletteDTO';
import GetSinglePaletteUseCase from './GetSinglePaletteUseCase';

export default class GetSinglePaletteController {
  constructor(private getSinglePaletteUseCase: GetSinglePaletteUseCase) {}

  async handle(
    request: Request<IGetSinglePaletteRequestDTO>,
    response: Response,
  ) {
    const palette = await this.getSinglePaletteUseCase.execute(
      request.params,
    );
    return response
      .status(201)
      .json({ palette });
    // try {
    // } catch (error) {
    //   return response
    //     .status(400)
    //     .json({ error });
    // }
  }
}
