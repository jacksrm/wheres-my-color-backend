import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Response } from 'express';
import { CreatePaletteUseCase } from './CreatePaletteUseCase';

export class CreatePaletteController {
  constructor(private createPaletteUseCase: CreatePaletteUseCase) {}

  handle = async (request: IRequestWithUserID, response: Response) => {
    const { userId } = request;

    if (!userId) return response.sendStatus(401);

    const { isPublic, name } = request.body;
    try {
      await this.createPaletteUseCase.execute({
        isPublic,
        name,
        ownerId: userId,
      });
      return response
        .status(201)
        .json({ message: `Palette "${name}" was added successfully!` });
    } catch (error) {
      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  };
}
