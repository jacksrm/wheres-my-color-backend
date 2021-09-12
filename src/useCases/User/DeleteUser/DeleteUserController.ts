import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Response } from 'express';
import { DeleteUserError } from './DeleteUserError';
import { DeleteUserUseCase } from './DeleteUserUseCase';

export class DeleteUserController {
  constructor(private useCase: DeleteUserUseCase) {}

  handle = async (request: IRequestWithUserID, response: Response) => {
    const { userId } = request;
    const { userId: idToRemove } = request.params;

    if (!userId || userId !== idToRemove) {
      return response.status(400).json({ message: 'Unauthorized!' });
    }

    try {
      await this.useCase.execute({ userId });
      return response.status(200).json({ message: 'User removed successfully!' });
    } catch (error) {
      if (error instanceof DeleteUserError) {
        return response.status(error.statusCode).json({ message: error.message });
      }

      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  };
}
