import { Request, Response } from 'express';
import { IGetSingleUserRequestDTO } from './GetSingleUserDTO';
import GetSingleUserUseCase from './GetSingleUserUseCase';

export default class GetSingleUserController {
  constructor(private getSingleUserUseCase: GetSingleUserUseCase) {}

  handle() {
    return async (
      request: Request<IGetSingleUserRequestDTO>,
      response: Response,
    ) => {
      try {
        const user = await this.getSingleUserUseCase.execute(request.params);
        return response.status(200).json({ user });
      } catch (error) {
        return response.status(404).json({ message: error.message });
      }
    };
  }
}
