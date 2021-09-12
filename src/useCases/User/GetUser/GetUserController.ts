import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Response } from 'express';
import { GetUserUseCase } from './GetUserUseCase';

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  handle = async (
    request: IRequestWithUserID,
    response: Response,
  ) => {
    const { userId } = request;

    if (!userId) {
      return response.status(400).json({ message: 'Unauthorized!' });
    }

    try {
      const user = await this.getUserUseCase.execute({ userId });
      return response.status(200).json({ user });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  };
}
