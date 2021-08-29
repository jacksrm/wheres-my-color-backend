import User from '@entities/User';
import { Request, Response } from 'express';
import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, password, profilePicture }: User = request.body;

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
      return response
        .status(400)
        .json({ message: error.message || 'An unexpected error ocurred!' });
    }
  }
}
