import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Response } from 'express';
import { DeleteColorError } from './DeleteColorError';
import { DeleteColorUseCase } from './DeleteColorUseCase';

export class DeleteColorController {
  constructor(private useCase: DeleteColorUseCase) {}

  handle = async (request: IRequestWithUserID, response: Response) => {
    const { userId } = request;
    const { colorId, paletteId } = request.params;

    if (!userId) return response.status(401).json({ message: 'Unauthorized!' });

    try {
      await this.useCase.execute({ colorId, paletteId, userId });
      return response.status(200).json({ message: 'Color removed successfully!' });
    } catch (error) {
      if (error instanceof DeleteColorError) {
        return response.status(error.statusCode).json({ message: error.message });
      }

      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  }
}
