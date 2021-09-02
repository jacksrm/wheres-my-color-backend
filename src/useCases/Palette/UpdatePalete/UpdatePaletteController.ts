import { Response } from 'express';
import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import UpdatePaletteUseCase from './UpdatePaletteUseCase';
import {
  IUpdatePaletteRequestBodyDTO,
  IUpdatePaletteRequestParamsDTO,
} from './UpdatePaletteDTO';

export default class UpdatePaletteController {
  constructor(private updatePaletteUseCase: UpdatePaletteUseCase) {}

  handle() {
    return async (request: IRequestWithUserID, response: Response) => {
      const { userId } = request;
      const { paletteId } = request.params as unknown as IUpdatePaletteRequestParamsDTO;
      const { colors, name, isPublic, membersId, authorizeChange } = (
        request.body as unknown as IUpdatePaletteRequestBodyDTO
      );

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
          userId!,
        );

        return response.status(200).json({ message: 'Updated successfully!' });
      } catch ({ message, statusCode = 400 }) {
        return response.status(statusCode).json({ message });
      }
    };
  }
}
