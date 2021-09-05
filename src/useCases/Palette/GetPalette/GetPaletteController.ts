import { Response } from 'express';
import { IRequestWithUserID } from '@interfaces/IRequestWithUserID';
import { IGetPaletteRequestDTO } from './GetPaletteDTO';
import { GetPaletteUseCase } from './GetPaletteUseCase';

export class GetPaletteController {
  constructor(private getPaletteUseCase: GetPaletteUseCase) {}

  handle() {
    return async (request: IRequestWithUserID, response: Response) => {
      try {
        const { userId } = request;
        const palette = await this.getPaletteUseCase.execute(
          request.params as unknown as IGetPaletteRequestDTO,
        );

        const canView = palette.membersId.some((memberId) => userId === memberId);

        if (!canView) {
          return response
            .status(401)
            .json({
              message: "You an't access this page because you're unauthorized",
            });
        }

        return response.status(200).json({ palette });
      } catch (error: any) {
        return response.status(404).json({ message: error.Message });
      }
    };
  }
}
