import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Response } from 'express';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  constructor(private useCase: UpdateUserUseCase) {}

  handle = async (request: IRequestWithUserID, response: Response) => {
    const { userId } = request;

    if (!userId) return response.status(401).json({ message: 'unauthorized' });

    try {
      await this.useCase.execute({ ...request.body, _id: userId });

      return response.status(200).json({ message: 'User updated successfully!' });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }

      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  }
}
