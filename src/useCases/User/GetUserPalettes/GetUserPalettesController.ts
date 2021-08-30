import { Request, Response } from 'express';
import { IGetUserPalettesRequestDTO } from './GetUserPalettesDTO';
import GetUserPalettesUseCase from './GetUserPalettesUseCase';

export default class GetUserPalettesController {
  constructor(private getUserPalettesUseCase: GetUserPalettesUseCase) {}

  handle() {
    return async (
      request: Request<IGetUserPalettesRequestDTO>,
      response: Response,
    ) => {
      const { ownerId } = request.params;

      try {
        const palettes = await this.getUserPalettesUseCase.execute({ ownerId });
        return response.status(201).json({ palettes });
      } catch (error) {
        return response.status(400).json({ message: 'An error has ocurred!' });
      }
    };
  }
}
