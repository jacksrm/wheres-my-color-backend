import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Request, Response } from 'express';
import { IGetPublicUserRequestDTO } from './GetPublicUserDTO';
import { GetPublicUserUseCase } from './GetPublicUserUseCase';

export class GetUserController {
  constructor(private useCase: GetPublicUserUseCase) {}

  handle = async (
    request: Request<IGetPublicUserRequestDTO>,
    response: Response,
  ) => {
    try {
      const user = await this.useCase.execute(request.params);
      return response.status(200).json({ user });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message });
      }

      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  };
}
