import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { NextFunction, Response } from 'express';
import { IRequestWithUserID } from 'interfaces/IRequestWithUserID';
import { IAuthenticateUserRequestDTO } from './AuthenticateUserDTO';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserMiddleware {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  handle() {
    return (
      request: IRequestWithUserID,
      response: Response,
      next: NextFunction,
    ) => {
      try {
        const decodedData = this.authenticateUserUseCase.execute(
          request.headers as IAuthenticateUserRequestDTO,
        );

        request.userId = decodedData.userId;
        return next();
      } catch (error) {
        if (error instanceof Error) {
          return response.status(401).json({ message: error.message });
        }

        return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
      }
    };
  }
}
