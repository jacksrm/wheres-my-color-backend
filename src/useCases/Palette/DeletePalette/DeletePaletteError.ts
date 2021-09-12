export class DeletePaletteError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}
