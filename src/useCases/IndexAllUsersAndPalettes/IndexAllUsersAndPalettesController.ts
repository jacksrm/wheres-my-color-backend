import { Request, Response } from 'express';
import { IndexAllUsersAndPalettesUseCase } from './IndexAllUsersAndPalettesUseCase';

export class IndexAllUsersAndPalettesController {
  constructor(private useCase: IndexAllUsersAndPalettesUseCase) {}

  handle() {
    return async (request: Request, response: Response) => {
      try {
        const data = await this.useCase.execute();

        return response.status(200).json(data);
      } catch {
        return response.sendStatus(400);
      }
    };
  }
}
