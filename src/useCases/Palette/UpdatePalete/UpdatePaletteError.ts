export class UpdatePaletteError extends Error {
  constructor(public readonly statusCode: number, message?: string) {
    super(message);
  }
}
