import { Request, Response } from 'express';
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
          return response
            .status(400)
            .json({ message: error.message || 'An unexpected error ocurred!' });
        }

        return response
          .status(400)
          .json({ message: 'An unexpected error ocurred!' });
      }
    };
  }
}
