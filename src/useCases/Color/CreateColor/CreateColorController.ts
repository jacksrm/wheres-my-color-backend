import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Response } from 'express';
import { CreateColorUseCase } from './CreateColorUseCase';

export class CreateColorController {
  constructor(private useCase: CreateColorUseCase) {}

  handle = async (request: IRequestWithUserID, response: Response) => {
    const { title, values } = request.body;
    const { paletteId } = request.params;
    try {
      await this.useCase.execute({ title, values, paletteId });
      return response.status(200).json({ message: 'Color added successfully!' });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  }
}
