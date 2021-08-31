import { Request, Response } from 'express';
import { IUserLoginRequestDTO } from './IUserLoginDTO';
import UserLoginUseCase from './UserLoginUserCase';

export default class UserLoginController {
  constructor(private userLoginUseCase: UserLoginUseCase) {}

  handle() {
    return async (request: Request, response: Response) => {
      try {
        const token = await this.userLoginUseCase.execute(request.body);
        return response.status(200).json({ token });
      } catch (error) {
        return response.status(400).json({ message: error.message });
      }
    };
  }
}
