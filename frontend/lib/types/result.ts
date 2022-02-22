export class Result {
  isError: boolean;
  message: string;
  data?: any;

  private constructor(isError: boolean, message: string, data?: any) {
    this.isError = isError;
    this.message = message;
    this.data = data;
  }

  static ok(message: string, data: any): Result {
    return new Result(false, message, data);
  }

  static fail(message: string): Result {
    return new Result(true, message);
  }
}
