import { Request, Response } from 'express';
import { IGetUserPalettesRequestDTO } from '../GetUserPalettes/GetUserPalettesDTO';
import GetPublicUserPalettesUseCase from './GetPublicUserPalettesUseCase';

export default class GetPublicUserPalettesController {
  constructor(private getPublicUserPalettesUseCase: GetPublicUserPalettesUseCase) {}

  handle() {
    return async (request: Request, response: Response) => {
      const { ownerId } = request.params as unknown as IGetUserPalettesRequestDTO;

      try {
        const palettes = await this.getPublicUserPalettesUseCase.execute({ ownerId });

        return response.status(200).json({ palettes });
      } catch (error) {
        return response.status(400).json({ message: 'An error has ocurred!' });
      }
    };
  }
}
