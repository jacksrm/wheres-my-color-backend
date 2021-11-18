import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Response } from 'express';
import { UpdateColorUseCase } from './UpdateColorUseCase';

export class UpdateColorController {
  constructor(private useCase: UpdateColorUseCase) {}

  handle = async (request: IRequestWithUserID, response: Response) => {
    const { userId } = request;
    const { title, values, colorId } = request.body;
    const { paletteId } = request.params;

    if (!userId) return response.sendStatus(401);

    try {
      await this.useCase.execute({ paletteId, colorId, values, title, userId });
      return response
        .status(200)
        .json({ message: 'Color updated successfully!' });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  };
}
