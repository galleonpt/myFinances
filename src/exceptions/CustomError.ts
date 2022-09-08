interface IError {
  status?: number;
  message: string;
}

class CustomError extends Error {
  status: number;

  constructor({ message, status }: IError) {
    super(message);
    this.status = status || 400;
  }
}

export { CustomError };
