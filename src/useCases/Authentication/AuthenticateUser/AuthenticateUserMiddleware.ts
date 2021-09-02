import { NextFunction, Response } from 'express';
import { IRequestWithUserID } from 'interfaces/IRequestWithUserID';
import {
  IAuthenticateUserJWT,
  IAuthenticateUserRequestDTO,
} from './AuthenticateUserDTO';
import AuthenticateUserUseCase from './AuthenticateUserUseCase';

export default class AuthenticateUserMiddleware {
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
        return response.status(401).json({ message: error.message });
      }
    };
  }
}
