import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Response } from 'express';
import { IRequestWithUserID } from 'interfaces/IRequestWithUserID';
import { IGetUserPalettesRequestDTO } from './GetUserPalettesDTO';
import { GetUserPalettesUseCase } from './GetUserPalettesUseCase';

export class GetUserPalettesController {
  constructor(private getUserPalettesUseCase: GetUserPalettesUseCase) {}

  handle = async (request: IRequestWithUserID, response: Response) => {
    const { userId } = request;
    const { ownerId } = request.params as unknown as IGetUserPalettesRequestDTO;

    if (userId !== ownerId) return response.sendStatus(401);

    try {
      const palettes = await this.getUserPalettesUseCase.execute({ ownerId });
      return response.status(200).json({ palettes });
    } catch (error) {
      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  };
}
