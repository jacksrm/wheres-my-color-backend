import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Request, Response } from 'express';
import { UserLoginUseCase } from './UserLoginUserCase';

export class UserLoginController {
  constructor(private userLoginUseCase: UserLoginUseCase) {}

  handle = async (request: Request, response: Response) => {
    try {
      const token = await this.userLoginUseCase.execute(request.body);
      return response.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
    }
  };
}
