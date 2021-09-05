import { DEFAULT_ERROR_MESSAGE } from '@utils/default';
import { Request, Response } from 'express';
import { ICreatePaletteRequestDTO } from './CreatePaletteDTO';
import { CreatePaletteUseCase } from './CreatePaletteUseCase';

export class CreatePaletteController {
  constructor(private createPaletteUseCase: CreatePaletteUseCase) {}

  handle() {
    return async (request: Request, response: Response) => {
      const { isPublic, name, ownerId }: ICreatePaletteRequestDTO = request.body;
      try {
        await this.createPaletteUseCase.execute({
          isPublic,
          name,
          ownerId,
        });
        return response
          .status(201)
          .json({ message: `Palette "${name}" was added successfully!` });
      } catch (error) {
        return response.status(400).json({ message: DEFAULT_ERROR_MESSAGE });
      }
    };
  }
}
