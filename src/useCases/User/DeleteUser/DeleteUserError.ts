export class DeleteUserError extends Error {
  constructor(public statusCode: number, message?: string) {
    super(message);
  }
}
