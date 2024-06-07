class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

const generateError = (msg: string, httpStatus: number): void => {
  throw new CustomError(msg, httpStatus);
};

export default generateError;
