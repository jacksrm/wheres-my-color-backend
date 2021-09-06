import { Request, Response } from 'express';
import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { CreateUserUseCase } from './CreateUserUseCase';
import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle() {
    return async (request: Request, response: Response) => {
      const {
        username,
        email,
        password,
        profilePicture,
      }: ICreateUserRequestDTO = request.body;

      try {
        await this.createUserUseCase.execute({
          username,
          email,
          password,
          profilePicture,
        });

        return response
          .status(201)
          .json({ message: 'User created successfully!' });
      } catch (error) {
        if (error instanceof Error) {
          return response.status(400).json({ message: error.message });
        }

        return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
      }
    };
  }
}
