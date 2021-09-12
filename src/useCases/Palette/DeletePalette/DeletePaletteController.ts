import { Response } from 'express';
import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { DeletePaletteUseCase } from './DeletePaletteUseCase';
import { DeletePaletteError } from './DeletePaletteError';

export class DeletePaletteController {
  constructor(private useCase: DeletePaletteUseCase) {}

  handle = async (request: IRequestWithUserID, response: Response) => {
    const { userId } = request;
    const { paletteId } = request.params;
    if (!userId) return response.status(401).json({ message: 'Unauthorized' });

    try {
      await this.useCase.execute({ paletteId, ownerId: userId });

      return response.status(200).json({ message: 'Palette removed successfully!' });
    } catch (error) {
      if (error instanceof DeletePaletteError) {
        return response.status(error.statusCode).json({ message: error.message });
      }

      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  };
}
