import { Response } from 'express';
import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import { UpdatePaletteUseCase } from './UpdatePaletteUseCase';
import {
  IUpdatePaletteRequestBodyDTO,
  IUpdatePaletteRequestParamsDTO,
} from './UpdatePaletteDTO';
import { UpdatePaletteError } from './UpdatePaletteError';

export class UpdatePaletteController {
  constructor(private updatePaletteUseCase: UpdatePaletteUseCase) {}

  handle() {
    return async (request: IRequestWithUserID, response: Response) => {
      const { userId } = request;
      const { paletteId } = (
        request.params as unknown as IUpdatePaletteRequestParamsDTO);
      const { colors, name, isPublic, membersId, authorizeChange } = (
        request.body as unknown as IUpdatePaletteRequestBodyDTO);

      if (!userId) {
        return response.status(400).json({
          message:
            "We can't process your request because theres no valid user ID!",
        });
      }
      try {
        await this.updatePaletteUseCase.execute(
          {
            colors,
            name,
            isPublic,
            membersId,
            authorizeChange,
            paletteId,
          },
          userId,
        );

        return response.status(200).json({ message: 'Updated successfully!' });
      } catch (error) {
        if (error instanceof UpdatePaletteError) {
          return response
            .status(error.statusCode)
            .json({ message: error.message });
        }

        return response
          .status(400)
          .json({ message: 'Unexpected error processing your request!' });
      }
    };
  }
}
