export class UpdateColorError extends Error {
  constructor(public errorCode: number, message?: string) {
    super(message);
  }
}
