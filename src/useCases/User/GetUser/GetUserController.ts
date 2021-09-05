import { Request, Response } from 'express';
import { IGetUserRequestDTO } from './GetUserDTO';
import { GetUserUseCase } from './GetUserUseCase';

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  handle() {
    return async (
      request: Request<IGetUserRequestDTO>,
      response: Response,
    ) => {
      try {
        const user = await this.getUserUseCase.execute(request.params);
        return response.status(200).json({ user });
      } catch (error) {
        if (error instanceof Error) {
          return response.status(404).json({ message: error.message });
        }

        return response.status(400).json({ message: 'Something went wrong!' });
      }
    };
  }
}
