export class ServerError extends Error {
  code: string;
  constructor(code: string, message?: string) {
    super(message ?? code);
    this.name = "ServerError";
    this.code = code;
  }
}
