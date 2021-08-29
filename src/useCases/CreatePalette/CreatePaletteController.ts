import { Request, Response } from 'express';
import { ICreatePaletteRequestDTO } from './CreatePaleteteDTO';
import CreatePaletteUseCase from './CreatePaletteUseCase';

export default class CreatePaletteController {
  constructor(private createPaletteUseCase: CreatePaletteUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { isPublic, name, ownerId }: ICreatePaletteRequestDTO = request.body;
    try {
      await this.createPaletteUseCase.execute({
        isPublic,
        name,
        ownerId,
      });
      return response
        .status(201)
        .json({ message: `Palette ${name} was added successfully!` });
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'There was and error processing your request!' });
    }
  }
}
