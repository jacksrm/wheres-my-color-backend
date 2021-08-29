import { Request, Response } from 'express';
import {
  IGetUserPalettesRequestDTO,
} from './GetUserPalettesDTO';
import GetUserPalettesUseCase from './GetUserPalettesUseCase';

export default class GetUserPalettesController {
  constructor(private getUserPalettesUseCase: GetUserPalettesUseCase) {}

  async handle(
    request: Request<IGetUserPalettesRequestDTO>,
    response: Response,
  ): Promise<Response> {
    const { userId } = request.params;

    try {
      const palettes = await this.getUserPalettesUseCase.execute({ userId });
      return response.status(201).json({ palettes });
    } catch (error) {
      return response.status(400).json({ message: 'An error has ocurred!' });
    }
  }
}
